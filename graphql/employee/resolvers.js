const { employee } = require("../../database/models");

const Query = {
  getEmployeeDetails: async () => {
    try {
      const employees = await employee.findAll();
      return employees;
    } catch (err) {
      console.log(err);
    }
  },

  getEmployeeDetail: async (root, { id }) => {
    try {
      const emp = await employee.findByPk(id);
      return emp;
    } catch (err) {
      console.log(err);
    }
  },
};

const Mutation = {
  createEmployee: async (root, { Name, Email, Manager_id }) => {
    try {
      (await employee) &&
        employee.create({
          Name,
          Email,
          Manager_id,
        });
      return "Employee created successfully";
    } catch (err) {
      console.log(err);
    }
  },
  updateEmployee: async (root, { id, Name, Email, Manager_id }) => {
    try {
      (await employee) &&
        employee.update(
          {
            Name,
            Email,
            Manager_id,
          },
          { where: { id: id } }
        );
      return "Employee updated successfully";
    } catch (err) {
      console.log(err);
    }
  },
  deleteEmployee: async (root, { id }) => {
    await employee.destroy({ where: { id: id } });
    return "Employee updated successfully";
  },
};

const Employee = {
  manager: (emp) => employee.findByPk(emp.Manager_id),
};

module.exports = { Query, Mutation, Employee };
