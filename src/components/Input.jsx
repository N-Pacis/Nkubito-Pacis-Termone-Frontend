export default function Input({ ...props }) {
    return (
        
        <input value={props.data.st} required={props.required} onChange={(event) => props.data.sts(event.target.value)} className="input" {...props}/>

    )
}