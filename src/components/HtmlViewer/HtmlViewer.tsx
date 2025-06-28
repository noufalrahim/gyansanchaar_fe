import DOMPurify from 'dompurify';

type HtmlViewerProps = {
    html: string;
};

export default function HtmlViewer({ html }: HtmlViewerProps) {
    return (
        <div
        className="quill-content px-6 py-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        />
    );
}
