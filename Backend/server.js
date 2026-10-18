const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


// MIDDLEWARE


app.use(cors());
app.use(express.json({ limit: "10mb" }));


// MONGODB CONNECTION


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:");
    console.log(error.message);
  });


// STUDENT SCHEMA


const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    registrationNo: {
      type: String,
      required: true,
      unique: true,
    },

    // Professional profile
    bio: {
      type: String,
      default: "",
      trim: true,
    },

    course: {
      type: String,
      default: "",
      trim: true,
    },

    branch: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
      trim: true,
    },

    mobile: {
      type: String,
      default: "",
      trim: true,
    },

    college: {
      type: String,
      default: "",
      trim: true,
    },

    // Optional photo
    profilePhoto: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model(
  "Student",
  studentSchema
);

// ======================================================
// ADMIN SCHEMA
// ======================================================

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model(
  "Admin",
  adminSchema
);


// EVENT SCHEMA


const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model(
  "Event",
  eventSchema
);

// REGISTRATION SCHEMA


const registrationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    registrationNo: {
      type: String,
      required: true,
    },

    rollNo: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    college: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Registered",
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model(
  "Registration",
  registrationSchema
);

// ======================================================
// NOTICE SCHEMA
// ======================================================

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model(
  "Notice",
  noticeSchema
);


// HOME / TEST ROUTE


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TechnoZoom Backend is Running",
  });
});


// ADMIN SIGNUP


app.post("/api/admin/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingAdmin =
      await Admin.findOne({
        email: email.toLowerCase(),
      });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin email already registered",
      });
    }

    const admin = new Admin({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: "Admin signup successful",

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.log(
      "Admin Signup Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ADMIN LOGIN


app.post("/api/admin/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const admin =
      await Admin.findOne({
        email: email.toLowerCase(),
      });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid admin email or password",
      });
    }

    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid admin email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin login successful",

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.log(
      "Admin Login Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// GET ALL ADMINS


app.get("/api/admins", async (req, res) => {
  try {
    const admins =
      await Admin.find()
        .select("-password")
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      admins,
    });

  } catch (error) {
    console.log(
      "Get Admins Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch admins",
    });
  }
});


// STUDENT SIGNUP


app.post("/api/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingStudent =
      await Student.findOne({
        email: email.toLowerCase(),
      });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    let registrationNo;

    let exists = true;

    while (exists) {
      registrationNo =
        "TZ" +
        Math.floor(
          100000 + Math.random() * 900000
        );

      exists =
        await Student.findOne({
          registrationNo,
        });
    }

    const student = new Student({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      registrationNo,
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",

      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        registrationNo:
          student.registrationNo,

        bio: student.bio,
        course: student.course,
        branch: student.branch,
        year: student.year,
        mobile: student.mobile,
        college: student.college,
        profilePhoto:
          student.profilePhoto,
      },
    });

  } catch (error) {
    console.log(
      "Signup Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// STUDENT LOGIN


app.post("/api/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const student =
      await Student.findOne({
        email: email.toLowerCase(),
      });

    if (!student) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    if (student.password !== password) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",

      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        registrationNo:
          student.registrationNo,

        bio: student.bio,
        course: student.course,
        branch: student.branch,
        year: student.year,
        mobile: student.mobile,
        college: student.college,
        profilePhoto:
          student.profilePhoto,
      },
    });

  } catch (error) {
    console.log(
      "Login Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ======================================================
// GET ALL STUDENTS - ADMIN
// ======================================================

app.get(
  "/api/students",
  async (req, res) => {
    try {
      const students =
        await Student.find()
          .select("-password")
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        students,
      });

    } catch (error) {
      console.log(
        "Get students error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch students",
      });
    }
  }
);


// GET SINGLE STUDENT PROFILE


app.get(
  "/api/students/:id",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const student =
        await Student.findById(id)
          .select("-password");

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });
      }

      res.status(200).json({
        success: true,
        student,
      });

    } catch (error) {
      console.log(
        "Get Profile Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch profile",
      });
    }
  }
);


// UPDATE STUDENT PROFILE


app.put(
  "/api/students/:id",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const {
        name,
        bio,
        course,
        branch,
        year,
        mobile,
        college,
        profilePhoto,
      } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Name is required",
        });
      }

      const updatedStudent =
        await Student.findByIdAndUpdate(
          id,
          {
            name: name.trim(),
            bio: bio || "",
            course: course || "",
            branch: branch || "",
            year: year || "",
            mobile: mobile || "",
            college: college || "",
            profilePhoto:
              profilePhoto || "",
          },
          {
            new: true,
            runValidators: true,
          }
        ).select("-password");

      if (!updatedStudent) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        student: updatedStudent,
      });

    } catch (error) {
      console.log(
        "Update Profile Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update profile",
      });
    }
  }
);


// REMOVE PROFILE PHOTO


app.delete(
  "/api/students/:id/photo",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const student =
        await Student.findByIdAndUpdate(
          id,
          {
            profilePhoto: "",
          },
          {
            new: true,
          }
        ).select("-password");

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Profile photo removed successfully",
        student,
      });

    } catch (error) {
      console.log(
        "Remove Photo Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to remove profile photo",
      });
    }
  }
);


// GET ALL EVENTS


app.get(
  "/api/events",
  async (req, res) => {
    try {
      const events =
        await Event.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        events,
      });

    } catch (error) {
      console.log(
        "Fetch Events Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch events",
      });
    }
  }
);


// ADD EVENT

app.post(
  "/api/events",
  async (req, res) => {
    try {
      const {
        title,
        description,
        date,
        venue,
        category,
        image,
      } = req.body;

      if (
        !title ||
        !description ||
        !date ||
        !venue ||
        !category
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all required event fields",
        });
      }

      const event =
        new Event({
          title,
          description,
          date,
          venue,
          category,
          image: image || "",
        });

      await event.save();

      res.status(201).json({
        success: true,
        message:
          "Event added successfully",
        event,
      });

    } catch (error) {
      console.log(
        "Add Event Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to add event",
      });
    }
  }
);

// UPDATE EVENT


app.put(
  "/api/events/:id",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const updatedEvent =
        await Event.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedEvent) {
        return res.status(404).json({
          success: false,
          message:
            "Event not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Event updated successfully",
        event: updatedEvent,
      });

    } catch (error) {
      console.log(
        "Update Event Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update event",
      });
    }
  }
);

// DELETE EVENT


app.delete(
  "/api/events/:id",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const deletedEvent =
        await Event.findByIdAndDelete(id);

      if (!deletedEvent) {
        return res.status(404).json({
          success: false,
          message:
            "Event not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Event deleted successfully",
      });

    } catch (error) {
      console.log(
        "Delete Event Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to delete event",
      });
    }
  }
);


// EVENT REGISTRATION


app.post(
  "/api/registrations",
  async (req, res) => {
    try {
      const {
        studentId,
        eventId,
        name,
        registrationNo,
        rollNo,
        course,
        branch,
        year,
        semester,
        mobile,
        college,
        email,
      } = req.body;

      if (
        !studentId ||
        !eventId ||
        !name ||
        !registrationNo ||
        !rollNo ||
        !course ||
        !branch ||
        !year ||
        !semester ||
        !mobile ||
        !college ||
        !email
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all fields",
        });
      }

      const student =
        await Student.findById(
          studentId
        );

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Student not found",
        });
      }

      const event =
        await Event.findById(
          eventId
        );

      if (!event) {
        return res.status(404).json({
          success: false,
          message:
            "Event not found",
        });
      }

      const alreadyRegistered =
        await Registration.findOne({
          studentId,
          eventId,
          status: "Registered",
        });

      if (alreadyRegistered) {
        return res.status(400).json({
          success: false,
          message:
            "You are already registered for this event",
        });
      }

      const registration =
        new Registration({
          studentId,
          eventId,
          name,
          registrationNo,
          rollNo,
          course,
          branch,
          year,
          semester,
          mobile,
          college,
          email,
        });

      await registration.save();

      res.status(201).json({
        success: true,
        message:
          "Event registration successful",
        registration,
      });

    } catch (error) {
      console.log(
        "Registration Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to register for event",
      });
    }
  }
);


// GET ALL REGISTRATIONS - ADMIN


app.get(
  "/api/registrations",
  async (req, res) => {
    try {
      const registrations =
        await Registration.find()
          .populate({
            path: "studentId",
            select: "-password",
          })
          .populate("eventId")
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        registrations,
      });

    } catch (error) {
      console.log(
        "Fetch All Registrations Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch registrations",
      });
    }
  }
);

// UPDATE EVENT REGISTRATION


app.put(
  "/api/registrations/:id",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const {
        rollNo,
        course,
        branch,
        year,
        semester,
        mobile,
        college,
      } = req.body;

      if (
        !rollNo ||
        !course ||
        !branch ||
        !year ||
        !semester ||
        !mobile ||
        !college
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all fields",
        });
      }

      const registration =
        await Registration.findById(
          id
        );

      if (!registration) {
        return res.status(404).json({
          success: false,
          message:
            "Registration not found",
        });
      }

      registration.rollNo =
        rollNo;

      registration.course =
        course;

      registration.branch =
        branch;

      registration.year =
        year;

      registration.semester =
        semester;

      registration.mobile =
        mobile;

      registration.college =
        college;

      await registration.save();

      res.status(200).json({
        success: true,
        message:
          "Registration updated successfully",
        registration,
      });

    } catch (error) {
      console.log(
        "Update Registration Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to update registration",
      });
    }
  }
);


// GET STUDENT REGISTRATIONS


app.get(
  "/api/registrations/student/:studentId",
  async (req, res) => {
    try {
      const {
        studentId,
      } = req.params;

      const registrations =
        await Registration.find({
          studentId,
        })
          .populate("eventId")
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        registrations,
      });

    } catch (error) {
      console.log(
        "Fetch Student Registration Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch registrations",
      });
    }
  }
);

// CANCEL EVENT REGISTRATION


app.delete(
  "/api/registrations/:id",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const registration =
        await Registration.findById(
          id
        );

      if (!registration) {
        return res.status(404).json({
          success: false,
          message:
            "Registration not found",
        });
      }

      registration.status =
        "Cancelled";

      await registration.save();

      res.status(200).json({
        success: true,
        message:
          "Registration cancelled successfully",
      });

    } catch (error) {
      console.log(
        "Cancel Registration Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to cancel registration",
      });
    }
  }
);


// GET ALL NOTICES


app.get(
  "/api/notices",
  async (req, res) => {
    try {
      const notices =
        await Notice.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        notices,
      });

    } catch (error) {
      console.log(
        "Get Notices Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to fetch notices",
      });
    }
  }
);


// ADD NOTICE - ADMIN


app.post(
  "/api/notices",
  async (req, res) => {
    try {
      const {
        title,
        message,
      } = req.body;

      if (!title || !message) {
        return res.status(400).json({
          success: false,
          message:
            "Title and message are required",
        });
      }

      const notice =
        new Notice({
          title,
          message,
        });

      await notice.save();

      res.status(201).json({
        success: true,
        message:
          "Notice added successfully",
        notice,
      });

    } catch (error) {
      console.log(
        "Add Notice Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to add notice",
      });
    }
  }
);

// ======================================================
// DELETE NOTICE - ADMIN
// ======================================================

app.delete(
  "/api/notices/:id",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const deletedNotice =
        await Notice.findByIdAndDelete(
          id
        );

      if (!deletedNotice) {
        return res.status(404).json({
          success: false,
          message:
            "Notice not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Notice deleted successfully",
      });

    } catch (error) {
      console.log(
        "Delete Notice Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to delete notice",
      });
    }
  }
);


// SERVER


const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `TechnoZoom Server running on port ${PORT}`
  );
});