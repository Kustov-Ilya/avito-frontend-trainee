import CustomButton from "../custom-button/custom-button";
import "./error.pcss";

export default function Error() {
  return (
    <div className="error text-lg-font-medium">
      <div className="error__content">
        Oh, sorry! We can’t load the page :(
        <CustomButton label="Reload" onClick={() => window.location.reload()} />
      </div>
    </div>
  );
}
