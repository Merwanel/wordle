export default function PopUp({message}:{message:string}) {
  return (
    <div className="popup" > 
      <span className="popuptext" id="myPopup">{message}</span> 
    </div>
    ) ;
}