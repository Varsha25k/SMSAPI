const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO STUDENT API');
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/students',async(req,res)=>{
    try{
        const result = await pool.query('select * from student');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotalstd',async(req,res)=>{
    try{
        const result = await pool.query('select count(ID) from student');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotalemp',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotaljob',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotaldep',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotalcountry',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotaljob_history',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from job_history');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotalloc',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotalregion',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/50',async(req,res)=>{
    try{
        const result = await pool.query(`SELECT jh.*, e.first_name, e.last_name, j.job_title, c.country_name
          From job_history jh
          join employees e ON jh.employee_id = e.employee_id
          join jobs j ON jh.job_id = j.job_id
          join departments d ON jh.department_id = d.department_id
          join locations l ON d.location_id = l.location_id
          join countries c ON l.country_id = c.country_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/51',async(req,res)=>{
    try{
        const result = await pool.query(`select r.region_name, c.country_name, l.city
         from regions r
         join countries c ON r.region_id = c.region_id
         join locations l ON c.country_id = l.country_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/52',async(req,res)=>{
    try{
        const result = await pool.query(`select c.country_name, r.region_name, l.city
         from countries c
         join regions r ON c.region_id = r.region_id
         join locations l ON c.country_id = l.country_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/53',async(req,res)=>{
    try{
        const result = await pool.query(`Select l.city, c.country_name, r.region_name
            from locations l
            join countries c ON l.country_id = c.country_id
            join regions r ON c.region_id = r.region_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/54',async(req,res)=>{
    try{
        const result = await pool.query(`Select d.department_name, e.first_name, e.last_name, l.city
            from departments d
            join employees e ON d.department_id = e.department_id
            join locations l ON d.location_id = l.location_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/55',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, d.department_name, l.city, c.country_name
            from employees e
            join departments d ON e.department_id = d.department_id
            join locations l ON d.location_id = l.location_id
            join countries c ON l.country_id = c.country_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/56',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name AS employee_name, m.first_name AS manager_name, d.department_name, l.city
            from employees e
            left join employees m ON e.manager_id = m.employee_id
            join departments d ON e.department_id = d.department_id
            join locations l ON d.location_id = l.location_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/57',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, j.job_title, d.department_name, l.city
            from employees e
            join jobs j ON e.job_id = j.job_id
            join departments d ON e.department_id = d.department_id
            join locations l ON d.location_id = l.location_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/58',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, j.job_title, d.department_name, m.first_name AS manager_name
            from employees e
            join jobs j ON e.job_id = j.job_id
            join departments d ON e.department_id = d.department_id
            left join employees m ON e.manager_id = m.employee_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/59',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, j.job_title, d.department_name, m.first_name AS manager_name, l.city
            from employees e
            join jobs j ON e.job_id = j.job_id
            join departments d ON e.department_id = d.department_id
            left join employees m ON e.manager_id = m.employee_id
            join locations l ON d.location_id = l.location_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/60',async(req,res)=>{
    try{
        const result = await pool.query(`Select country_name
            from countries
            where region_id = 1`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/61',async(req,res)=>{
    try{
        const result = await pool.query(`Select d.department_name, l.city
            from departments d
            join locations l ON d.location_id = l.location_id
            where l.city LIKE 'N%'`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/62',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, d.department_name
            from employees e
            join departments d ON e.department_id = d.department_id
            where e.manager_id IN (
                select employee_id
                from employees
                where commission_pct > 0.15
            )`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/63',async(req,res)=>{
    try{
        const result = await pool.query(`Select DISTINCT j.job_title
            from employees e
            join jobs j ON e.job_id = j.job_id
            where e.employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL)`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/64',async(req,res)=>{
    try{
        const result = await pool.query(`Select l.postal_code
            from locations l
            join countries c ON l.country_id = c.country_id
            join regions r ON c.region_id = r.region_id
            where r.region_name = 'Asia'`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/65',async(req,res)=>{
    try{
        const result = await pool.query(`Select DISTINCT d.department_name
            from departments d
            join employees e ON d.department_id = e.department_id
            where e.commission_pct < (Select AVG(commission_pct) from employees where commission_pct IS NOT NULL)`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/66',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, j.job_title
            from employees e
            join jobs j ON e.job_id = j.job_id
            where e.salary > (Select AVG(salary) from employees e2 where e2.department_id = e.department_id)`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/67',async(req,res)=>{
    try{
        const result = await pool.query(`Select employee_id
            from employees
            where department_id IS NULL`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/68',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name
            from employees e
            join job_history jh ON e.employee_id = jh.employee_id
            group by e.employee_id, e.first_name, e.last_name
            having COUNT(jh.job_id) > 1`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/69',async(req,res)=>{
    try{
        const result = await pool.query(`Select d.department_name, COUNT(e.employee_id) AS employee_count
            from departments d
            left join employees e ON d.department_id = e.department_id
            group by d.department_name`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/70',async(req,res)=>{
    try{
        const result = await pool.query(`Select j.job_title, SUM(e.salary) AS total_salary
            from jobs j
            join employees e ON j.job_id = e.job_id
            group by j.job_title`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/71',async(req,res)=>{
    try{
        const result = await pool.query(`Select d.department_name, AVG(e.commission_pct) AS average_commission
            from departments d
            join employees e ON d.department_id = e.department_id
            group by d.department_name`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/72.1',async(req,res)=>{
    try{
        const result = await pool.query(`Select c.country_name,MAX(e.salary) AS max_salary
            from employees e
            join departments d ON e.department_id = d.department_id
            join locations l ON d.location_id = l.location_id
            join  countries c ON l.country_id = c.country_id
            group by c.country_name`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/72.2',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name,e.last_name,d.department_name,l.city,l.state_province
            from employees e
            join departments d ON e.department_id = d.department_id
            join locations l ON d.location_id = l.location_id
            Where LOWER(e.first_name) LIKE '%z%'`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/73',async(req,res)=>{
    try{
        const result = await pool.query(`Select j.job_title, d.department_name, e.first_name, e.last_name, jh.start_date
            from job_history jh
            join jobs j ON jh.job_id = j.job_id
            join employees e ON jh.employee_id = e.employee_id
            join departments d ON jh.department_id = d.department_id
            where jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31'`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/74',async(req,res)=>{
    try{
        const result = await pool.query(`Select c.country_name, l.city, COUNT(d.department_id) AS department_count
            from countries c
            join locations l ON c.country_id = l.country_id
            join departments d ON l.location_id = d.location_id
            join employees e ON d.department_id = e.department_id
            group by c.country_name, l.city
            having COUNT(e.employee_id) >= 2`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/75',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, j.job_title, jh.start_date, jh.end_date
            from employees e
            join job_history jh ON e.employee_id = jh.employee_id
            join jobs j ON jh.job_id = j.job_id
            where e.commission_pct IS NULL`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/76',async(req,res)=>{
    try{
        const result = await pool.query(`select e.employee_id, e.first_name, e.last_name, c.country_name
            from employees e
            join departments d ON e.department_id = d.department_id
            join locations l ON d.location_id = l.location_id
            join countries c ON l.country_id = c.country_id`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/77',async(req,res)=>{
    try{
        const result = await pool.query(`select e.first_name, e.last_name, e.salary, e.department_id
            from employees e
            where e.salary = (SELECT MIN(salary) FROM employees WHERE department_id = e.department_id)`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/78',async(req,res)=>{
    try{
        const result = await pool.query(`select *
            from employees
            where salary = (
                select DISTINCT salary
                from employees
                ORDER BY salary DESC
                LIMIT 1 OFFSET 2
            )`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/79',async(req,res)=>{
    try{
        const result = await pool.query(`select e.employee_id, e.first_name, e.last_name, e.salary
            from employees e
            where e.salary > (select AVG(salary) FROM employees)
            and e.department_id IN (
                Select e2.department_id
                from employees e2
                where e2.first_name LIKE '%J%' OR e2.last_name LIKE '%J%'
            )`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/80',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, e.employee_id, j.job_title
            from employees e
            join jobs j ON e.job_id = j.job_id
            join departments d ON e.department_id = d.department_id
            join locations l ON d.location_id = l.location_id
            where l.city = 'Toronto'`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/employee',async(req,res)=>{
    try{
        const result = await pool.query('Select * from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/region',async(req,res)=>{
    try{
        const result = await pool.query('Select * from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/country',async(req,res)=>{
    try{
        const result = await pool.query('Select * from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/location',async(req,res)=>{
    try{
        const result = await pool.query('Select * from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/employee',async(req,res)=>{
    try{
        const result = await pool.query('Select * from ');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/department',async(req,res)=>{
    try{
        const result = await pool.query('Select * from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/job',async(req,res)=>{
    try{
        const result = await pool.query('Select * from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/job_history',async(req,res)=>{
    try{
        const result = await pool.query('Select * from job_history');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Successfully....Running on PORT ${PORT}`);
});