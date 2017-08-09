//bootstrap the application (you can ignore this for now)
ReactDOM.render(
  <CodeEditor />,
  document.getElementById('base')
);


function CodeEditor() {
  return (
    <div>
      <input
         type="text"
         defaultValue="unhappy" />
       <div className="controls">
          <button className="up" />
          <button className="down" />
          <button className="remove" />
       </div>
    </div>
  )
}