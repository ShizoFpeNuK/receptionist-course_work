interface DialogTimerReturnProps {
  seconds: number,
}


const DialogTimerReturn = (props: DialogTimerReturnProps) => {
  return (
    <div className="dialog_return">
      <p> Через {props.seconds} сек. всё будет очищено и готово к работе! </p>
    </div>
  )
};


export default DialogTimerReturn;