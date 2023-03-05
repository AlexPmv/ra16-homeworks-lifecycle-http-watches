export default function WatchAddForm(props) {
  return (
    <form className="watch-form" onSubmit={props.onSubmit}>
      <input className="watch-name" placeholder="Название" required></input>
      <input className="watch-timezone" placeholder="Часовой пояс" required></input>
      <button className="watch-add-btn">Добавить</button>
    </form> 
  )
}