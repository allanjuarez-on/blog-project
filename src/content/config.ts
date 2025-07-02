import { file, glob } from 'astro/loaders'
import { z, defineCollection, reference, type SchemaContext } from 'astro:content'

// Astro utiliza Zod para verificar e implementar tipos con typescript.

// CATEGORY COLLECTION
const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

const categories = defineCollection({
  // type: 'data',
  // file(path: string, options: {})
  // El cargador file obtiene todos los datos de un documento json o yaml principalmente si de un array se trata
  loader: file('./src/data/categories/categories.json'),
  schema: categorySchema,
})

// AUTHOR COLLECTION
const authorSchema = z.object({
  name: z.string(),
  bio: z.string(),
  nickname: z.string().optional(),
  socialMedia: z.string().url().array(),
})

const authors = defineCollection({
  // type: 'data',
  // loader: file('./src/data/authors/authors.json'),
  loader: glob({ pattern: '**/*.json', base: './src/data/authors' }),
  schema: authorSchema,
})

// SchemaContext
// Funcion que permite reutilizar schemas en diferentes contextos.
const imageSchema = ({ image }: SchemaContext) => {
  return z.object({
    img: image(),
    description: z.string(),
  })
}

// ARTICLE COLLECTION
const articleSchema = ({ image }: SchemaContext) => {
  return z.object({
    title: z.string().max(60, { message: 'El titulo no debe ser mayor a 60 caracteres.' }),
    authors: z.array(reference('authors')),
    date: z.coerce.date(),
    category: reference('categories'),
    cover: imageSchema({ image }),
    thumbnail: imageSchema({ image }),
    relatedPosts: reference('posts').array().optional(),
  })
}
const articles = defineCollection({
  // Cada vez que se define una coleccion con el tipo "content", astro en automatico genera un slug con el id del archivo.
  // type: 'content',
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/articles',
  }),
  schema: articleSchema,
})

export const collections = {
  // El nombre de las colecciones exportadas debe coincidir con el del directorio src/content/**
  authors,
  categories,
  articles,
}
