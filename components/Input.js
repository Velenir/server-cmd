import React from 'react';
 
const Input = ({sendCommand = ({target}) => console.log([...new FormData(target).values()])}) => (
	<form className="form-horizontal input-panel" onSubmit={(e) => (e.preventDefault(), sendCommand && sendCommand(e))}>
		<div className="form-group input-panel__controls input-panel__controls--cmd">
			<label htmlFor="cmd" className="col-sm-2 control-label input-panel__label">Команда</label>
			<div className="col-sm-10">
				<input type="text" className="form-control input-panel__text" id="cmd" name="cmd" required placeholder="ls -la"/>
			</div>
		</div>
		<div className="form-group input-panel__controls input-panel__controls--comment">
			<label htmlFor="comment" className="col-sm-2 control-label input-panel__label">Комментарий</label>
			<div className="col-sm-10">
				<textarea type="text" rows="3" className="form-control input-panel__textarea" id="comment" name="comment" placeholder="выводит список файлов"/>
			</div>
		</div>
		<div className="form-group input-panel__controls input-panel__controls--submit">
			<div className="col-sm-offset-2 col-sm-10">
				<button type="submit" className="btn btn-default input-panel__btn">Отправить</button>
			</div>
		</div>
	</form>
);

export default Input;