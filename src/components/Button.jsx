export default function Button({ title = "Click me", ...props }) {
    return <div className="mt-12">
        <button
            className="submit-btn" {...props}>{title}</button>
    </div>
}