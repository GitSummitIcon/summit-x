import type { APIRoute } from "astro";
import { sanityClient } from "../lib/sanity";

export const GET: APIRoute = async () => {
  const [chalets, lodges, destinations, expeditions, heliSkis, editArticles] =
    await Promise.all([
      sanityClient.fetch(
        `*[_type == "chalet"] | order(name asc) {
          name, "slug": slug.current,
          "destination": destination->name, bedrooms,
          "thumb": gallery[0].asset->url + "?w=200&auto=format"
        }`
      ),
      sanityClient.fetch(
        `*[_type == "lodge"] | order(name asc) {
          name, "slug": slug.current,
          "destination": destination->name, style,
          "thumb": gallery[0].asset->url + "?w=200&auto=format"
        }`
      ),
      sanityClient.fetch(
        `*[_type == "destination"] | order(name asc) {
          name, region, "slug": slug.current,
          "thumb": heroImage.asset->url + "?w=200&auto=format"
        }`
      ),
      sanityClient.fetch(
        `*[_type == "expedition"] | order(name asc) {
          name, "slug": slug.current,
          "destination": destination->name, season, duration,
          "thumb": gallery[0].asset->url + "?w=200&auto=format"
        }`
      ),
      sanityClient.fetch(
        `*[_type == "heliSki"] | order(name asc) {
          name, "slug": slug.current,
          "destination": destination->name, terrainType, season,
          "thumb": gallery[0].asset->url + "?w=200&auto=format"
        }`
      ),
      sanityClient.fetch(
        `*[_type == "theEdit"] | order(_createdAt desc) {
          title, "slug": slug.current, category,
          "thumb": images[0].asset->url + "?w=200&auto=format"
        }`
      ),
    ]);

  const index = [
    ...chalets.map((c: any) => ({
      type: "chalet",
      title: c.name,
      subtitle: [c.destination, c.bedrooms && `${c.bedrooms} bed`]
        .filter(Boolean)
        .join(" · "),
      href: `/chalets/${c.slug}`,
      thumb: c.thumb ?? null,
    })),
    ...lodges.map((l: any) => ({
      type: "lodge",
      title: l.name,
      subtitle: [l.destination, l.style].filter(Boolean).join(" · "),
      href: `/lodges/${l.slug}`,
      thumb: l.thumb ?? null,
    })),
    ...destinations.map((d: any) => ({
      type: "destination",
      title: d.name,
      subtitle: d.region ?? "",
      href: `/destinations/${d.slug}`,
      thumb: d.thumb ?? null,
    })),
    ...expeditions.map((e: any) => ({
      type: "expedition",
      title: e.name,
      subtitle: [e.destination, e.season, e.duration].filter(Boolean).join(" · "),
      href: `/expeditions/${e.slug}`,
      thumb: e.thumb ?? null,
    })),
    ...heliSkis.map((h: any) => ({
      type: "heli-ski",
      title: h.name,
      subtitle: [h.destination, h.terrainType, h.season]
        .filter(Boolean)
        .join(" · "),
      href: `/heli-ski/${h.slug}`,
      thumb: h.thumb ?? null,
    })),
    ...editArticles.map((a: any) => ({
      type: "article",
      title: a.title,
      subtitle: a.category ?? "",
      href: `/the-edit/${a.slug}`,
      thumb: a.thumb ?? null,
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
