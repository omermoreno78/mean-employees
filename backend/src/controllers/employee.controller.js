const employeeMod = require('../models/employee');

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
	const employees = await employeeMod.find();
	
	res.json({
		'status': 'success',
		'data': employees
	});
};

employeeCtrl.createEmployee = async (req, res) => {
	console.log('-- employeeCtrl.createEmployee() - req.body:');
	console.log(req.body);
	
	const employee = new employeeMod(req.body);
	await employee.save();
	
	res.json({
		'status': 'success',
		'data': employee
	});
};

employeeCtrl.getEmployee = async (req, res) => {
	let id = req.params.id;
	
	console.log('-- employeeCtrl.getEmployee() - id: ', id);
	
	const employee = await employeeMod.findById(id);
	
	res.json({
		'status': 'success',
		'data': employee
	});
};

employeeCtrl.setEmployee = async (req, res) => {
	console.log('-- employeeCtrl.setEmployee() - req.body:');
	console.log(req.body);
	
	const { id } = req.params;
	const employeeValues = {
		name: req.body.name,
		position: req.body.position,
		office: req.body.office,
		salary: req.body.salary
	};
	
	await employeeMod.findByIdAndUpdate(id, { $set: employeeValues }, { new: true }, (err, res2) => {
		if (err) {
			return res.status(500).json({
				'status': 'error',
				'message': err
			});
		}
		
		return res.json({
			'status': 'success',
			'data': res2
		});
	});
};

employeeCtrl.deleteEmployee = async (req, res) => {
	let id = req.params.id;
	
	console.log('-- employeeCtrl.deleteEmployee() - id: ', id);
	
	await employeeMod.findByIdAndRemove(id, (err, res2) => {
		if (err) {
			return res.status(500).json({
				'status': 'error',
				'message': err
			});
		}
		
		return res.json({
			'status': 'success',
			'data': res2
		});
	});
};

module.exports = employeeCtrl;
