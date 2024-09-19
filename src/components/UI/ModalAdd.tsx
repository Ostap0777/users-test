import React, { useState, useEffect } from 'react';
import styles from './modaladd.module.scss';
import { ModalAddProps } from '../models/models';

export default function ModalAdd({ closeModal }: ModalAddProps) {
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [countries, setCountries] = useState<{ name: string, value: string }[]>([]);
  const [departments, setDepartments] = useState<{ name: string, value: string }[]>([]);
  const [statuses, setStatuses] = useState<{ name: string, value: string }[]>([]);

  useEffect(() => {
    const storedCountries = localStorage.getItem('countries');
    const storedDepartments = localStorage.getItem('departments');
    const storedStatuses = localStorage.getItem('statuses');

    if (storedCountries) setCountries(JSON.parse(storedCountries));
    if (storedDepartments) setDepartments(JSON.parse(storedDepartments));
    if (storedStatuses) setStatuses(JSON.parse(storedStatuses));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName || !country || !department || !status) {
      console.log('Будь ласка, заповніть усі поля.');
      return;
    }
    const selectedCountryObj = countries.find(c => c.value === country);
    const selectedDepartmentObj = departments.find(d => d.value === department);
    const selectedStatusObj = statuses.find(s => s.value === status);

    if (!selectedCountryObj || !selectedDepartmentObj || !selectedStatusObj) {
      console.log('Неправильний вибір.');
      return;
    }

    const newUser = {
      name: fullName,
      country: {
        name: selectedCountryObj.name,
        value: selectedCountryObj.value,
      },
      department: {
        name: selectedDepartmentObj.name,
        value: selectedDepartmentObj.value,
      },
      status: {
        name: selectedStatusObj.name,
        value: selectedStatusObj.value,
      },
    };
    console.log('Новий користувач:', newUser);
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Оновлений список користувачів:', JSON.stringify(users));

    setFullName('');
    setCountry('');
    setDepartment('');
    setStatus('');

    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <h2 className={styles.modal__title}>Додати користувача</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.modal__items}>
          <div className={styles.modal__item}>
            <label className={styles.form__label} htmlFor="fullName">Повне ім'я</label>
            <input
              className={styles.form__input}
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className={styles.modal__item}>
            <p className={styles.modal__text__info}>Країна</p>
            <select className={styles.modal__select}  value={country}  onChange={(e) => setCountry(e.target.value)}>
              <option className={styles.modal__option} value="">Оберіть країну</option>
              {countries.map(c => (
                <option key={c.value} value={c.value}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.modal__item}>
            <p className={styles.modal__text__info}>Відділ</p>
            <select className={styles.modal__select} value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option className={styles.modal__option} value="">Оберіть відділ</option>
              {departments.map(d => (
                <option key={d.value} value={d.value}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.modal__item}>
            <p className={styles.modal__text__info}>Статус</p>
            <select className={styles.modal__select} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option className={styles.modal__option} value="">Оберіть статус</option>
              {statuses.map(s => (
                <option key={s.value} value={s.value}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
			 <div className={styles.modal__buttons}>
            <button className={styles.modal__button} type="button" onClick={closeModal}>
              Закрити
            </button>
            <button className={`${styles.modal__button} ${styles.modal__add}`} type="submit">
             <span>Додати користувача</span> 
            </button>
          </div>
			 </div>
        </form>
      </div>
    </div>
  );
}
