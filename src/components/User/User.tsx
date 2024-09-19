import React, { useEffect, useState } from 'react';
import styles from './user.module.scss';
import Header from '../Header/Header';
import ModalAdd from '../UI/ModalAdd';

export default function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, setCountries] = useState<{ name: string, value: string }[]>([]);
  const [departments, setDepartments] = useState<{ name: string, value: string }[]>([]);
  const [statuses, setStatuses] = useState<{ name: string, value: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [users, setUsers] = useState<{ name: string, country: { name: string, value: string }, department: { name: string, value: string }, status: { name: string, value: string } }[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<{ name: string, country: { name: string, value: string }, department: { name: string, value: string }, status: { name: string, value: string } }[]>([]);

  useEffect(() => {
    const storedCountries = localStorage.getItem('countries');
    const storedDepartments = localStorage.getItem('departments');
    const storedStatuses = localStorage.getItem('statuses');
    const storedUsers = localStorage.getItem('users');

    if (storedCountries) setCountries(JSON.parse(storedCountries));
    if (storedDepartments) setDepartments(JSON.parse(storedDepartments));
    if (storedStatuses) setStatuses(JSON.parse(storedStatuses));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      (!selectedCountry || user.country.value === selectedCountry) &&
      (!selectedDepartment || user.department.value === selectedDepartment) &&
      (!selectedStatus || user.status.value === selectedStatus)
    );
    setFilteredUsers(filtered);
  }, [selectedCountry, selectedDepartment, selectedStatus, users]);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const resetFilters = () => {
    setSelectedCountry('');
    setSelectedDepartment('');
    setSelectedStatus('');
  };

  const handleDeleteUser = (userName: string) => {
    const updatedUsers = users.filter(user => user.name !== userName);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <section className={styles.user__section}>
      <Header />
      <div className="user__container">
        <div className={styles.user__content}>
          <h2 className={styles.user__title}>Users</h2>
          <p className={styles.selector__info}>
            Please add at least 3 departments to be able to proceed to the next steps.
          </p>
          <div className={styles.user__functional}>
            <div className={styles.user__selectors}>
              <select  className={styles.user__selector} id="country-select" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} disabled={departments.length < 3}>
                <option className={styles.user__option} value="">
                  Select a country
                </option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.name}
                  </option>
                ))}
              </select>
              <select  className={styles.user__selector} id="department-select" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option className={styles.user__option} value="">
                  Select a department
                </option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <select className={styles.user__selector} id="status-select"value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} disabled={departments.length < 3}>
                <option className={styles.user__option} value="">
                  Select a status
                </option>
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.user__buttons}>
              <button onClick={resetFilters}>
                <img className={styles.user__img} src="/img/ri_delete-bin-3-line.svg" alt="Delete" />
              </button>
              <button onClick={openModal}>
                <a className={styles.user__button}>Add User</a> 
              </button>
            </div>
          </div>
          <div className={styles.user__list}>
            <h3 className={styles.user__listtitle}>
              <div>Full Name</div>
              <div>Department</div>
              <div>Country</div>
              <div>Status</div>
              <div>Actions</div>
            </h3>
            {filteredUsers.length > 0 ? (
              <ul className={styles.user__listitems}>
                {filteredUsers.map((user, index) => (
                  <li key={index} className={styles.user__listitem}>
                    <div className={styles.user__listitem__content}>{user.name}</div>
                    <div className={styles.user__listitem__content}>{user.department.name}</div>
                    <div className={styles.user__listitem__content}>{user.country.name}</div>
                    <div className={styles.user__listitem__content}>{user.status.name}</div>
                    <div>
                      <button  className={styles.user__deleteButton}  onClick={() => handleDeleteUser(user.name)} >
                        <img src="/img/ri_delete-bin-3-line.svg" alt="Delete" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.user__error}>No users found based on the selected filters.</p>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && <ModalAdd closeModal={closeModal} />}
    </section>
  );
}
