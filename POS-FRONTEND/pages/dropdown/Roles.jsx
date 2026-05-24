import { useState, useEffect } from 'react';
import axios from "axios";

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const fetchRoles = async () => {
        const token = localStorage.getItem('token');
        const paginationDto = {
    page: 0,
    sizePerPage: 50,
  };
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        try {
            const response = await axios.post(`http://localhost:8080/api/role/list`, paginationDto, { headers })
            setRoles(response.data || []);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div>
            <label>Roles</label>
            <select name="roles" id="roles">
                <option>Select Role</option>
                {roles.map((role) => (
                    <option key={role.identifier} value={role.identifier}>{role.identifier}</option>
                ))}
            </select>
        </div>
    )

}

export default Roles;