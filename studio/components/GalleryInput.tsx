import { useCallback, useState } from 'react'
import {
  PatchEvent,
  set,
  useClient,
  type ArrayOfObjectsInputProps,
} from 'sanity'
import { Button, Flex, Grid, Spinner, Stack, Text } from '@sanity/ui'

interface ImageAsset {
  _id: string
  url: string
  originalFilename?: string
}

export function GalleryInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [open, setOpen] = useState(false)
  const [assets, setAssets] = useState<ImageAsset[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  const handleOpen = useCallback(async () => {
    setSelected(new Set())
    setOpen(true)
    setLoading(true)
    try {
      const results = await client.fetch<ImageAsset[]>(
        `*[_type == "sanity.imageAsset"] | order(_createdAt desc) [0...500] {
          _id, url, originalFilename
        }`,
      )
      setAssets(results)
    } catch (err) {
      console.error('GalleryInput: failed to fetch assets', err)
    } finally {
      setLoading(false)
    }
  }, [client])

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleAdd = useCallback(() => {
    const existing = Array.isArray(props.value) ? (props.value as unknown[]) : []
    const newItems = [
      ...existing,
      ...Array.from(selected).map((id, i) => ({
        _type: 'image',
        _key: `img-${Date.now()}-${i}`,
        asset: { _type: 'reference', _ref: id },
      })),
    ]
    props.onChange(PatchEvent.from(set(newItems)))
    setOpen(false)
    setSelected(new Set())
  }, [selected, props])

  const selCount = selected.size

  return (
    <Stack space={3}>
      {props.renderDefault(props)}

      {!open ? (
        <Button
          mode="ghost"
          tone="primary"
          text="Add multiple images from library"
          onClick={handleOpen}
          style={{ width: '100%' }}
        />
      ) : (
        <div
          style={{
            border: '1px solid var(--card-border-color, rgba(255,255,255,0.12))',
            borderRadius: 3,
            overflow: 'hidden',
            background: 'var(--card-bg-color, #1a1a1a)',
          }}
        >
          {/* header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderBottom: '1px solid var(--card-border-color, rgba(255,255,255,0.12))',
            }}
          >
            <Text size={1} weight="semibold">
              {selCount > 0 ? `${selCount} image${selCount !== 1 ? 's' : ''} selected` : 'Select images'}
            </Text>
            <Button mode="bleed" tone="default" text="Close" onClick={() => setOpen(false)} />
          </div>

          {/* grid */}
          <div style={{ padding: 12, maxHeight: 420, overflowY: 'auto' }}>
            {loading ? (
              <Flex align="center" justify="center" style={{ minHeight: 200 }}>
                <Spinner muted />
              </Flex>
            ) : assets.length === 0 ? (
              <Flex align="center" justify="center" style={{ minHeight: 200 }}>
                <Text muted size={1}>No images in library yet.</Text>
              </Flex>
            ) : (
              <Grid columns={5} gap={2}>
                {assets.map((asset) => {
                  const isSelected = selected.has(asset._id)
                  return (
                    <div
                      key={asset._id}
                      onClick={() => toggleSelect(asset._id)}
                      style={{
                        cursor: 'pointer',
                        position: 'relative',
                        aspectRatio: '1',
                        borderRadius: 2,
                        overflow: 'hidden',
                        outline: isSelected ? '2px solid #2276fc' : '2px solid transparent',
                        outlineOffset: 1,
                      }}
                    >
                      <img
                        src={`${asset.url}?w=200&h=200&fit=crop&auto=format`}
                        alt={asset.originalFilename ?? ''}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      {isSelected && (
                        <>
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(34,118,252,0.22)',
                              pointerEvents: 'none',
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: 5,
                              right: 5,
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              background: '#2276fc',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontSize: 12,
                              fontWeight: 700,
                              pointerEvents: 'none',
                            }}
                          >
                            ✓
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </Grid>
            )}
          </div>

          {/* footer */}
          <div
            style={{
              padding: '10px 14px',
              borderTop: '1px solid var(--card-border-color, rgba(255,255,255,0.12))',
            }}
          >
            <Button
              tone="primary"
              disabled={selCount === 0}
              onClick={handleAdd}
              text={selCount > 0 ? `Add ${selCount} image${selCount !== 1 ? 's' : ''}` : 'Select images above'}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}
    </Stack>
  )
}
