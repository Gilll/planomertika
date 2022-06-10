import React from "react";
import s from './Form.module.scss';
import MyBtn from './../../myBtn/MyBtn';




const Form = () => {

  return (

    <div className={s.feedback}>
      <div className={s.title}>Оставьте заявку</div>
      <div className={s.subtitle}>Оставьте свой номер, и мы перезвоним Вам.</div>
      <form action="">
        <div className={s.inputsWrap}>
          <input type="text" className={s.input} placeholder="Ваше имя" />
          <input type="number" className={s.input} placeholder="Номер телефона" />
          <textarea type="texarea" className={s.input} placeholder="Комментарий" />
        </div>
        <MyBtn title="Отправить"/>
      </form>
    </div>
  );
};


export default Form;

