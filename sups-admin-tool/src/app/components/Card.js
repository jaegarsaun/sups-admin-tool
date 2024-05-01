export default function Card(props) {
  return (
    <div className={`bg-secondaryDark p-4 rounded-xl text-white w-full ${props.className}`}>
        {props.content}
    </div>
  );
}
