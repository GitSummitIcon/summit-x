import { useCallback, useState } from 'react'
import {
  PatchEvent,
  set,
  useClient,
  type ArrayOfObjectsInputProps,
} from 'sanity'
import { Box, Button, Card, Dialog, Flex, Grid, Spinner, Stack, Text } from '@sanity/ui'

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
  const dialogHeader =
    selCount > 0 ? `${selCount} image${selCount !== 1 ? 's' : ''} selected` : 'Select images'

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Button
        mode="ghost"
        tone="primary"
        text="Add multiple images from library"
        onClick={handleOpen}
        style={{ width: '100%' }}
      />

      {open && (
        <Dialog
          header={dialogHeader}
          id="gallery-multi-select"
          onClose={() => setOpen(false)}
          width={4}
          footer={
            <Box padding={3}>
              <Button
                tone="primary"
                disabled={selCount === 0}
                onClick={handleAdd}
                text={selCount > 0 ? `Add ${selCount} image${selCount !== 1 ? 's' : ''}` : 'Select images above'}
                style={{ width: '100%' }}
              />
            </Box>
          }
        >
          <Box padding={4} style={{ minHeight: 400 }}>
            {loading ? (
              <Flex align="center" justify="center" style={{ minHeight: 400 }}>
                <Spinner muted />
              </Flex>
            ) : assets.length === 0 ? (
              <Flex align="center" justify="center" style={{ minHeight: 400 }}>
                <Text muted>No images in library yet.</Text>
              </Flex>
            ) : (
              <Grid columns={4} gap={2}>
                {assets.map((asset) => {
                  const isSelected = selected.has(asset._id)
                  return (
                    <Card
                      key={asset._id}
                      radius={2}
                      style={{
                        cursor: 'pointer',
                        outline: isSelected ? '2px solid #2276fc' : '2px solid transparent',
                        position: 'relative',
                        overflow: 'hidden',
                        aspectRatio: '1',
                      }}
                      onClick={() => toggleSelect(asset._id)}
                    >
                      <img
                        src={`${asset.url}?w=220&h=220&fit=crop&auto=format`}
                        alt={asset.originalFilename ?? ''}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(34,118,252,0.20)',
                          }}
                        />
                      )}
                      <div
                        style={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: isSelected ? '#2276fc' : 'rgba(0,0,0,0.35)',
                          border: '2px solid white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 13,
                          fontWeight: 700,
                          transition: 'background 0.1s',
                        }}
                      >
                        {isSelected ? '✓' : ''}
                      </div>
                    </Card>
                  )
                })}
              </Grid>
            )}
          </Box>
        </Dialog>
      )}
    </Stack>
  )
}
