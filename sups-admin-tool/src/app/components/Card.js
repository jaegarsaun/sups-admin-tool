export default function Card(props) {
  return (
    <div className={`bg-secondaryDark p-4 rounded-xl text-white w-full text-center flex flex-col items-center justify-center ${props.className}`}>
        <p className="text-gray-500">{props.title}</p>
        <h1 className="font-bold text-xl">{props.content}</h1>
    </div>
  );
}
