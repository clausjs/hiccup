import { JSONSchemaType } from "ajv"
import e from "express"

export interface SearchProvider {
  type: string,
  name?: string,
  url?: string,
}

export interface LinksEntity {
  name: string
  link: string
  tags?: string
}

export interface FeaturedEntity extends LinksEntity {
  background?: string
}

export interface CategoriesEntity {
  title: string
  links: LinkEntityWithIcon[]
}

export interface RemoteIcon {
  url: string;
  name?: string;
}

export interface LinkEntityWithIcon extends LinksEntity {
  icon?: string | RemoteIcon;
}

export interface NewEntity extends LinkEntityWithIcon {
  category?: string
}

export interface Metadata {
  readonly?: boolean
  editing?: boolean
  search?: SearchProvider[]
}

export interface ConfigEntity {
  version: string
  id: string
  title: string
  url?: string
  featured: FeaturedEntity[]
  categories: CategoriesEntity[]
  metadata?: Metadata
}

export interface LocalConfigStore {
  active: string
  untouched: boolean
  dragging?: boolean
  configs: {
    [id: string]: ConfigEntity
  }
}

export const schema: JSONSchemaType<ConfigEntity> = {
  type: "object",
  properties: {
    version: { type: 'string' },
    id: { type: 'string' },
    title: { type: 'string' },
    url: { type: 'string', nullable: true },
    featured: {
      type: 'array', items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          link: { type: 'string' },
          tags: { type: 'string', nullable: true },
          background: { type: 'string', nullable: true },
        },
        required: ['link', 'name']
      }
    },
    categories: {
      type: 'array', items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          links: {
            type: 'array', items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                link: { type: 'string' },
                icon: { type: 'string', nullable: true },
                tags: { type: 'string', nullable: true },
              },
              required: ['link', 'name']
            }
          },
        },
        required: ['links', 'title']
      }
    },
    metadata: {
      type: 'object', properties: {
        readonly: { type: "boolean", nullable: true },
        editing: { type: "boolean", nullable: true },
        search: {
          type: 'array', items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              name: { type: 'string', nullable: true },
              url: { type: 'string', nullable: true },
            },
            required: ['type']
          }, nullable: true
        }
      },
      nullable: true
    }
  },
  required: ['id', 'title', 'version', 'featured', 'categories'],
  additionalProperties: false
}