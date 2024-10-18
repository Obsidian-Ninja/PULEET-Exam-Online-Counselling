import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcryptjs";
import path from "path";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "12345678",
  port: 5432,
});
db.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Successfully connected to the database');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
});


app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/online_registration", (req, res) => {
  res.render("online_registration");
});

app.get("/registration", (req, res) => {
  res.render("registration");
});

app.post('/register/college', async (req, res) => {
  const {
    collegeName,
    collegeEmail,
    collegePassword,
    branch,
    cse_general,
    cse_sc,
    cse_st,
    cse_backward_class,
    cse_sports,
    cse_defence,
    cse_disability,
    cse_riot_victim,
    cse_freedom_fighter,
    it_general,
    it_sc,
    it_st,
    it_backward_class,
    it_sports,
    it_defence,
    it_disability,
    it_riot_victim,
    it_freedom_fighter,
    ece_general,
    ece_sc,
    ece_st,
    ece_backward_class,
    ece_sports,
    ece_defence,
    ece_disability,
    ece_riot_victim,
    ece_freedom_fighter,
    mech_general,
    mech_sc,
    mech_st,
    mech_backward_class,
    mech_sports,
    mech_defence,
    mech_disability,
    mech_riot_victim,
    mech_freedom_fighter,
    bio_general,
    bio_sc,
    bio_st,
    bio_backward_class,
    bio_sports,
    bio_defence,
    bio_disability,
    bio_riot_victim,
    bio_freedom_fighter
  } = req.body;

  try {
    const queryText = `
      INSERT INTO college_vacancies 
        (college_name, college_email, college_password, branch,
         cse_general, cse_sc, cse_st, cse_backward_class, cse_sports, cse_defence, cse_disability, cse_riot_victim, cse_freedom_fighter,
         it_general, it_sc, it_st, it_backward_class, it_sports, it_defence, it_disability, it_riot_victim, it_freedom_fighter,
         ece_general, ece_sc, ece_st, ece_backward_class, ece_sports, ece_defence, ece_disability, ece_riot_victim, ece_freedom_fighter,
         mech_general, mech_sc, mech_st, mech_backward_class, mech_sports, mech_defence, mech_disability, mech_riot_victim, mech_freedom_fighter,
         bio_general, bio_sc, bio_st, bio_backward_class, bio_sports, bio_defence, bio_disability, bio_riot_victim, bio_freedom_fighter)
      VALUES 
        ($1, $2, $3, $4,
         $5, $6, $7, $8, $9, $10, $11, $12, $13,
         $14, $15, $16, $17, $18, $19, $20, $21, $22,
         $23, $24, $25, $26, $27, $28, $29, $30, $31,
         $32, $33, $34, $35, $36, $37, $38, $39, $40,
         $41, $42, $43, $44, $45, $46, $47, $48, $49)
    `;

    const values = [
      collegeName,
      collegeEmail,
      collegePassword,
      branch,
      // Branch-specific values
      branch === 'cse' ? cse_general : 0,
      branch === 'cse' ? cse_sc : 0,
      branch === 'cse' ? cse_st : 0,
      branch === 'cse' ? cse_backward_class : 0,
      branch === 'cse' ? cse_sports : 0,
      branch === 'cse' ? cse_defence : 0,
      branch === 'cse' ? cse_disability : 0,
      branch === 'cse' ? cse_riot_victim : 0,
      branch === 'cse' ? cse_freedom_fighter : 0,
      branch === 'it' ? it_general : 0,
      branch === 'it' ? it_sc : 0,
      branch === 'it' ? it_st : 0,
      branch === 'it' ? it_backward_class : 0,
      branch === 'it' ? it_sports : 0,
      branch === 'it' ? it_defence : 0,
      branch === 'it' ? it_disability : 0,
      branch === 'it' ? it_riot_victim : 0,
      branch === 'it' ? it_freedom_fighter : 0,
      branch === 'ece' ? ece_general : 0,
      branch === 'ece' ? ece_sc : 0,
      branch === 'ece' ? ece_st : 0,
      branch === 'ece' ? ece_backward_class : 0,
      branch === 'ece' ? ece_sports : 0,
      branch === 'ece' ? ece_defence : 0,
      branch === 'ece' ? ece_disability : 0,
      branch === 'ece' ? ece_riot_victim : 0,
      branch === 'ece' ? ece_freedom_fighter : 0,
      branch === 'mech' ? mech_general : 0,
      branch === 'mech' ? mech_sc : 0,
      branch === 'mech' ? mech_st : 0,
      branch === 'mech' ? mech_backward_class : 0,
      branch === 'mech' ? mech_sports : 0,
      branch === 'mech' ? mech_defence : 0,
      branch === 'mech' ? mech_disability : 0,
      branch === 'mech' ? mech_riot_victim : 0,
      branch === 'mech' ? mech_freedom_fighter : 0,
      branch === 'bio' ? bio_general : 0,
      branch === 'bio' ? bio_sc : 0,
      branch === 'bio' ? bio_st : 0,
      branch === 'bio' ? bio_backward_class : 0,
      branch === 'bio' ? bio_sports : 0,
      branch === 'bio' ? bio_defence : 0,
      branch === 'bio' ? bio_disability : 0,
      branch === 'bio' ? bio_riot_victim : 0,
      branch === 'bio' ? bio_freedom_fighter : 0
    ];

    await db.query(queryText, values);
    res.status(200).send('College Registered Successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});





app.post('/register', async (req, res) => {
  const { department, course, name, fathers_name, mothers_name, guardian_name, dob, gender, nationality, address_correspondence, address_permanent, mobile1, mobile2, email, password, roll_number, marks, rank, category, preference1, preference2, preference3, preference4, preference5 } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO registration 
                    (department, course, name, fathers_name, mothers_name, guardian_name, dob, gender, nationality, address_correspondence, address_permanent, mobile1, mobile2, email, password, roll_number, marks, rank, category, preference1, preference2, preference3, preference4, preference5) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`;
    const values = [department, course, name, fathers_name, mothers_name, guardian_name, dob, gender, nationality, address_correspondence, address_permanent, mobile1, mobile2, email, hashedPassword, roll_number, marks, rank, category, preference1, preference2, preference3, preference4, preference5];
    await db.query(query, values);
    res.send("Registration successful! Go ahead and login.");
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).send('An error occurred while registering student. TRY AGAIN');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = 'SELECT * FROM registration WHERE email = $1';
    const result = await db.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid email or password');
    }
    res.render("adm_cns", { user }); // render new page
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('An error occurred while logging in. TRY AGAIN');
  }
});

// New route for displaying allocated college
// New route for displaying allocated college
// New route for displaying allocated college
// New route for displaying allocated college
// New route for displaying allocated college
app.get('/admission_counselling', async (req, res) => {
  try {
    const students = await db.query('SELECT * FROM registration ORDER BY rank ASC');
    const colleges = await db.query('SELECT * FROM college_vacancies');

    const allocateSeats = () => {
      const collegeSeats = {};

      colleges.rows.forEach(college => {
        collegeSeats[college.id] = {
          ...college,
          seats: {
            general: {},
            sc: {},
            st: {},
            backward_class: {},
            sports: {},
            defence: {},
            disability: {},
            riot_victim: {},
            freedom_fighter: {}
          }
        };

        ['cse', 'it', 'ece', 'mech', 'bio'].forEach(branch => {
          ['general', 'sc', 'st', 'backward_class', 'sports', 'defence', 'disability', 'riot_victim', 'freedom_fighter'].forEach(category => {
            collegeSeats[college.id].seats[category][branch] = college[`${branch}_${category}`];
          });
        });
      });

      return students.rows.map(student => {
        let assignedCollege = null;

        for (const pref of [student.preference1, student.preference2, student.preference3, student.preference4, student.preference5]) {
          if (!assignedCollege) {
            for (const [collegeId, seats] of Object.entries(collegeSeats)) {
              const branch = pref;
              const category = student.category;

              if (seats.seats[category][branch] > 0) {
                assignedCollege = {
                  id: collegeId,
                  name: seats.college_name,
                  branch: branch,
                  category: category
                };

                collegeSeats[collegeId].seats[category][branch] -= 1;
                break;
              }
            }
          }
        }

        return {
          ...student,
          assignedCollege: assignedCollege || { name: 'No College Assigned', branch: 'N/A', category: student.category }
        };
      });
    };

    const allocatedStudents = allocateSeats();
    res.render("adm_cns", { allocatedStudents }); // Ensure the template name is correct
  } catch (error) {
    console.error('Error during seat allocation:', error);
    res.status(500).send('An error occurred while allocating seats.');
  }
});



// New route for faculty to view admitted students
app.get('/faculty_dashboard', async (req, res) => {
  try {
      // Fetch students and colleges from the database
      const students = await db.query('SELECT * FROM registration ORDER BY rank ASC');
      const colleges = await db.query('SELECT * FROM college_vacancies');

      if (!students.rows.length || !colleges.rows.length) {
          return res.status(404).send('No data available.');
      }

      // Prepare college seat data
      const collegeSeats = {};
      colleges.rows.forEach(college => {
          collegeSeats[college.id] = {
              ...college,
              seats: {
                  general: {},
                  sc: {},
                  st: {},
                  backward_class: {},
                  sports: {},
                  defence: {},
                  disability: {},
                  riot_victim: {},
                  freedom_fighter: {}
              }
          };

          ['cse', 'it', 'ece', 'mech', 'bio'].forEach(branch => {
              ['general', 'sc', 'st', 'backward_class', 'sports', 'defence', 'disability', 'riot_victim', 'freedom_fighter'].forEach(category => {
                  collegeSeats[college.id].seats[category][branch] = college[`${branch}_${category}`];
              });
          });
      });

      // Allocate seats to students
      const allocateSeats = () => {
          return students.rows.map(student => {
              let assignedCollege = null;
              for (const pref of [student.preference1, student.preference2, student.preference3, student.preference4, student.preference5]) {
                  if (!assignedCollege) {
                      for (const [collegeId, seats] of Object.entries(collegeSeats)) {
                          const branch = pref;
                          const category = student.category;
                          if (seats.seats[category][branch] > 0) {
                              assignedCollege = {
                                  id: collegeId,
                                  name: seats.college_name,
                                  branch: branch,
                                  category: category
                              };
                              collegeSeats[collegeId].seats[category][branch] -= 1;
                              break;
                          }
                      }
                  }
              }
              return {
                  ...student,
                  assignedCollege: assignedCollege || { name: 'No College Assigned', branch: 'N/A', category: student.category }
              };
          });
      };

      const allocatedStudents = allocateSeats();

      // Group students by branch
      const branches = allocatedStudents.reduce((acc, student) => {
          const branch = student.assignedCollege.branch;
          if (!acc[branch]) {
              acc[branch] = [];
          }
          acc[branch].push(student);
          return acc;
      }, {});

      // Render the results
      res.render('faculty_dashboard', { branches });
  } catch (error) {
      console.error('Error during seat allocation:', error);
      res.status(500).send('An error occurred while allocating seats.');
  }
});



app.get("/login_faculty", (req, res) => {
  res.render("login_faculty");
});

app.get("/contact_us", (req, res) => {
  res.render("contact_us");
});

app.post('/login_college', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to find the college by email
    const query = 'SELECT * FROM college_vacancies WHERE college_email = $1';
    const result = await db.query(query, [email]);
    const college = result.rows[0];
    
    // Check if college exists
    if (!college) {
      return res.status(401).send('Invalid email or password');
    }
    
    // Compare the password with the stored password in the database
    if (college.college_password !== password) {
      return res.status(401).send('Invalid email or password');
    }
    
    // Redirect to the faculty dashboard if login is successful
    res.redirect('/faculty_dashboard');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('An error occurred while logging in. TRY AGAIN');
  }
});



app.get("/registration_faculty", (req, res) => {
  res.render("registration_faculty");
});

app.get("/copyright_policy", (req, res) => {
  res.render("copyright_policy");
});

app.get("/privacy_policy", (req, res) => {
  res.render("privacy_policy");
});

app.get("/hyperlink_policy", (req, res) => {
  res.render("hyperlink_policy");
});

app.get("/terms_and_conditions", (req, res) => {
  res.render("terms_and_conditions");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
