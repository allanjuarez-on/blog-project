import { z, defineCollection, reference } from 'astro:content'

// Astro utiliza Zod para verificar e implementar tipos con typescript.

// SCHEMAS
const authorSchema = z.object({
  name: z.string(),
  // nickname: z.enum(['allanjuarez', 'allanjuarez-on', 'allanjuarez-404']),
  nickname: z.string(),
  socialMedia: z.string().array(),
})

const authorProps = authorSchema.required({
  name: true,
  nickname: true,
})

const blogSchema = z.object({
  title: z.string().max(60, { message: 'El titulo no debe ser mayor a 60 caracteres.' }),
  author: reference('author'),
  date: z.string().transform(str => new Date(str)),
  category: z.string(),
  heroImage: z.string().url(),
  relatedPosts: z.array(reference('blog')),
})

const blogProps = blogSchema.required({
  title: true,
  date: true,
  category: true,
})

// COLLECTIONS
const blog = defineCollection({
  // Cada vez que se define una coleccion con el tipo "content", astro en automatico genera un slug con el id del archivo.
  type: 'content',
  schema: blogProps,
})

const author = defineCollection({
  type: 'data',
  schema: authorProps,
})

export const collections = {
  // El nombre de las colecciones exportadas debe coincidir con el del directorio src/content/**
  blog,
  author,
}
