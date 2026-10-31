import { RichTextContent } from '@/components/common/RichTextContent'
import type { RichBody } from '@/types/site'

export function ArticleBody({ body }: { body: RichBody }) {
  if (body.kind === 'rich') return <RichTextContent data={body.data} />
  return (
    <div className="prose-copy max-w-2xl">
      {body.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}
