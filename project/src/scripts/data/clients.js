export default [
  {
    // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
    id: '1',
    // дата и время создания клиента, заполняется сервером автоматически,
    // после создания нельзя изменить
    createdAt: '2021-02-04T13:12:34.554Z',
    // дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
    updatedAt: '2022-02-12T16:06:29.554Z',
    // * обязательное поле, имя клиента
    name: 'Василий',
    // * обязательное поле, фамилия клиента
    surname: 'Пупкин',
    // необязательное поле, отчество клиента
    lastName: 'Васильевич',
    // контакты - необязательное поле, массив контактов
    // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
    contacts: [
      {
        type: 'tel',
        value: '+71234567890',
      },
      {
        type: 'email',
        value: 'abc@xyz.com',
      },
      {
        type: 'facebook',
        value: 'https://facebook.com/vasiliy-pupkin-the-best',
      },
    ],
  },
  {
    id: '2',
    createdAt: '2021-02-03T13:07:29.554Z',
    updatedAt: '2021-02-03T13:07:29.554Z',
    name: 'Евгений',
    surname: 'Иванов',
    lastName: 'Петрович',
    contacts: [
      {
        type: 'tel',
        value: '+48666777888',
      },
      {
        type: 'email',
        value: 'testEvgenii@xyz.com',
      },
      {
        type: 'facebook',
        value: 'https://facebook.com/second-in-array',
      },
    ],
  },
  {
    id: '3',
    createdAt: '2021-01-03T13:07:29.554Z',
    updatedAt: '2021-02-03T13:07:29.554Z',
    name: 'Илля',
    surname: 'Картошкин',
    lastName: 'Алексеевич',
    contacts: [
      {
        type: 'tel',
        value: '+48999888111',
      },
      {
        type: 'email',
        value: 'IIIIIIIboi@xyz.com',
      },
      {
        type: 'facebook',
        value: 'https://facebook.com/third-in-array',
      },
    ],
  },
];
