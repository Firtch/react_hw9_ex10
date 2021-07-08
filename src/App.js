import "./App.css";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";

const content = {
  inputs: [
    {
      label: "Фамилия",
      name: "secondName",
      type: "text",
    },
    {
      label: "Имя",
      name: "firstName",
      type: "text",
    },
    {
      label: "Отчество",
      name: "thirdName",
      type: "text",
    },
    {
      label: "Дата рождения",
      name: "birthday",
      type: "text",
    },
    {
      label: "Телефон",
      name: "phone",
      type: "text",
    },
    {
      label: "E-mail",
      name: "email",
      type: "email",
    },
  ],
};

const schema = yup.object().shape({
  secondName: yup
    .string()
    .required("Пожалуйста введите фамилию")
    .max(50, "Фамилия должна содержать не более 50-ти симаолов"),
  firstName: yup
    .string()
    .required("Пожалуйста введите имя")
    .max(31, "Фамилия должна содержать не более 31 символа"),
  thirdName: yup
    .string()
    .required("Пожалуйста введите отчество")
    .max(31, "Фамилия должна содержать не более 31 символа"),
  birthday: yup
    .string()
    .required("Пожалуйста введите дату рождения")
    .matches(/\d{2}.\d{2}.\d{4}/, "Формат даты должен быть: dd.MM.yyyy"),
  phone: yup
    .string()
    .required("Пожалуйста укажите номер телефона")
    .matches(
      /\+7\(\d{3}\) \d{3} \d{2} \d{2}/,
      "Формат номера телефона должен быть: +7(NNN) NNN NN NN"
    ),
  email: yup.string().email(),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [dis, setDis] = React.useState("");

  const onSubmit = (data) => {
    console.log(data);
    const { secondName, firstName, thirdName, birthday, phone, email } = data;

    setDis("disabled");

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        name: `${secondName} ${firstName} ${thirdName}`,
        birthday,
        email,
        phone,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => { 
        console.log(json);
        setDis("");
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        {content.inputs.map((input, key) => {
          return (
            <div key={key}>
              <p>
                <label className="label">{input.label}</label>
              </p>
              <p>
                <input
                  disabled={dis}
                  defaultValue=""
                  type={input.type}
                  name={input.name}
                  className="input"
                  {...register(input.name)}
                />
              </p>
              <p className="messages">{errors[input.name]?.message}</p>
            </div>
          );
        })}
        <button className="btn" type="submit">
          отправить
        </button>
      </form>
    </div>
  );
}

export default App;
