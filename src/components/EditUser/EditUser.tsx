import React, { useEffect, useState } from 'react';
import styles from './edituser.module.scss';
import Header from '../Header/Header';
import { saveToLocalStorage } from '../../saveLocalStorage';

export default function EditUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [originalUser, setOriginalUser] = useState<any | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    saveToLocalStorage();
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const user = users.find(user => user.name === selectedUserId) || null;
      setSelectedUser(user);
      setOriginalUser(user); 
      setIsChanged(false); 
    }
  }, [selectedUserId, users]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (selectedUser) {
      const updatedUser = {
        ...selectedUser,
        [name]: value,
      };
      setSelectedUser(updatedUser);
      setIsChanged(JSON.stringify(updatedUser) !== JSON.stringify(originalUser));
    }
  };

  const handleSave = () => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.name === selectedUser.name ? selectedUser : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setOriginalUser(selectedUser); 
      setIsChanged(false); 
    }
  };

  const handleUndo = () => {
    if (originalUser) {
      setSelectedUser(originalUser);
      setIsChanged(false);
    }
  };

  return (
    <section className={styles.edituser__section}>
      <Header />
      <div className={styles.edituser__container}>
        <div className={styles.edituser__content}>
          <h2 className={styles.edituser__title}>Edit User</h2>
          <form className={styles.user__form} action="">
            <label className={styles.user__label} htmlFor="user-select">User</label>
            <select className={styles.user__select} id="user-select"  value={selectedUserId || ''} onChange={handleUserSelect} >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.name} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </form>
          {selectedUser && (
            <div className={styles.user__info}>
              <h2 className={styles.user__title}>User Info</h2>
              <form className={styles.form__items} action="">
                <div className={styles.form__item}>
                  <label className={styles.form__label} htmlFor="name">Full Name</label>
                  <input className={styles.form__input} type="text" name="name" value={selectedUser.name}  onChange={handleInputChange}/>
                </div>
                <div className={styles.form__item}>
                  <label className={styles.form__label} htmlFor="country">Country</label>
                  <input className={styles.form__input} type="text" name="country" value={selectedUser.country.name}  onChange={handleInputChange}/>
                </div>
                <div className={styles.form__item}>
                  <label className={styles.form__label} htmlFor="department">Department</label>
                  <input className={styles.form__input} type="text" name="department" value={selectedUser.department.name} onChange={handleInputChange}/>
                </div>
                <div className={styles.form__item}>
                  <label className={styles.form__label} htmlFor="status">Status</label>
                  <input className={styles.form__input} type="text" name="status" value={selectedUser.status.name} onChange={handleInputChange} />
                </div>
              </form>
            </div>
          )}
          <div className={styles.edituser__buttons}>
            {isChanged && (
              <button onClick={handleUndo}>
                <span className={`${styles.edituser__button} ${styles.edituser__undo}`}>Undo</span>
              </button>
            )}
            <button onClick={handleSave} disabled={!isChanged} >
              <span className={`${styles.edituser__button} ${styles.edituser__save}`}>Save</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
