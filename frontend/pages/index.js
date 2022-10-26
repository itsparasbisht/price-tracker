import Image from "next/image";
import rupeeIcon from "../assets/rupee-indian.png";

console.log(rupeeIcon);

export default function Home() {
  return (
    <div>
      <nav>
        <Image src={rupeeIcon} alt="" />
        <h3>Amazon Price Tracker</h3>
      </nav>

      <form>
        <input type="url" name="url" id="url" />
        <button type="button">get item</button>
      </form>
    </div>
  );
}
