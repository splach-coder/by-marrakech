/**
 * Renders a JSON-LD block. Server component — the markup must be in the HTML
 * that arrives without JavaScript, because AI crawlers do not execute JS.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
    return (
        <script
            type="application/ld+json"
            // JSON.stringify output is safe here: every value comes from our own
            // data files, and < / > are escaped below to close off the one way a
            // string could break out of the script tag.
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e'),
            }}
        />
    );
}
