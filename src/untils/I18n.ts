import {IValidErrorMsgs} from "./Validations.d";

type IMapString = Record<string, string>;

export type I18nFormField = {
  label: string;
  placeholder?: string;
  errors?: IValidErrorMsgs;
};

function asType<T>(value: T) {
  return value;
}

function asFormFields<Fs extends Record<string, I18nFormField>>(map: Fs) {
  return map as Record<keyof Fs, I18nFormField>;
}

export class I18n {
  constructor(data?: I18n) {
    Object.assign(this, data);
  }

  errors = asType<Record<string, string>>({
    401: "Unauthorized",
    404: "Not found",
    500: "Internal server error",
    offline: "Please check your connection.",
    PARTNER_NOT_FOUND: "Partner not found",
  });

  config = {
    nations: asType<IMapString>({}),
    nationality: asType<IMapString>({}),
    academicLevel: asType<IMapString>({}),
    hospital: asType<IMapString>({}),
    gender: asType<IMapString>({}),
    diseases: asType<IMapString>({}),
    jobTitle: asType<IMapString>({}),
    area: asType<IMapString>({}),
  };

  system = {
    yes: "Yes",
    no: "No",
    ok: "Ok",
    cancel: "Cancel",
    disagree: "Disagree",
    agree: "Agree",
    active: "Active",
    inactive: "Inactive",
    gender: "Gender",
    status: "Status",
    acceptance: "Acceptance",
    create: "Create",
    update: "Update",
    submit: "Submit",
    notices: {
      offline: "You lose connection.",
      online: "You are back online.",
    },
  };

  component = {
    menubar: {
      dashboard: "Dashboard",
      languages: "Languages",
      patient: "Patient",
      doctors: "Doctors",
      account: {
        manager: "Account manager",
        create: "New account",
        partner: "Partner",
        doctors: "Doctors",
        patient: "Patient",
      },
      partner: {
        root: "Partner",
        clinics: "Clinics",
        accounts: "Admin account",
        specialties: "SpecialtyType",
      },
      clinics: {
        manager: "Clinic manager",
      },
      specialties: {
        manager: "Medical Specialties",
      },
    },

    formLogin: {
      username: "User name",
      password: "Password",
      signIn: "Login",
    },
    inputs: asFormFields({
      workplace: {
        label: "Work places",
        errors: {
          required: "Worl places is required",
        },
      },
      diseases: {
        label: "Diseases",
        errors: {
          required: "Diseases is required",
        },
      },
      jobTitle: {
        label: "Job title",
        errors: {
          required: "Job title is required",
        },
      },
      gender: {
        label: "Gender",
        errors: {
          required: "Gender is required",
        },
      },
      academicRank: {
        label: "Academic Rank",
        placeholder: "Academic Rank",
        errors: {
          required: "Academic Rank is required",
        },
      },
      nation: {
        label: "Nation",
        placeholder: "Nation",
        errors: {
          required: "Nation can not empty.",
        },
      },
      nationality: {
        label: "Nationality",
        placeholder: "Nationality",
        errors: {
          required: "Nationality can not empty.",
        },
      },
    }),

    accountForm: asFormFields({
      firstName: {
        label: "First Name",
        placeholder: "First Name",
        errors: {
          required: "First Name can not empty.",
        },
      },
      lastName: {
        label: "Last Name",
        placeholder: "Last Name",
        errors: {
          required: "Last Name can not empty.",
        },
      },
      phoneNumber: {
        label: "Phone number",
        placeholder: "Phone number",
        errors: {
          required: "Phone number can not empty.",
        },
      },
      email: {
        label: "Email",
        placeholder: "Email",
        errors: {
          required: "Email can not empty.",
          pattern: "Email is invalid.",
        },
      },
      password: {
        label: "Password",
        placeholder: "Password",
        errors: {
          required: "Password can not empty.",
        },
      },
    }),

    formSpecialist: asFormFields({
      specialtyType: {
        label: "Specialist code",
        placeholder: "Enter specialist code ",
        errors: {
          required: "Specialist code can not empty.",
        },
      },
      name: {
        label: "Specialist name",
        placeholder: "Enter specialist name",
        errors: {
          required: "Name code can not empty.",
        },
      },
      description: {
        label: "Specialist description",
        placeholder: "Enter specialist name",
        errors: {
          required: "Specialist description can not empty.",
        },
      },
    }),

    formSpeciateType: asFormFields({
      code: {
        label: "Code",
        placeholder: "Code specialty type",
        errors: {
          required: "Name code can not empty.",
        },
      },
      vi: {
        label: "Vi name ",
        placeholder: "Vi name specialty type name",
        errors: {
          required: "Vi name can not empty.",
        },
      },
      en: {
        label: "En name",
        placeholder: "En name specialty type name",
        errors: {
          required: "En name specialty type can not empty.",
        },
      },
    }),

    partnerForm: asFormFields({
      partner: {
        label: "Partner Code",
        placeholder: "Partner Code",
        errors: {
          required: "Partner Code can not empty.",
        },
      },
      phoneNumberExt1: {
        label: "Phone number Ext1",
        placeholder: "Phone number Ext1",
      },
      phoneNumberExt2: {
        label: "Phone number Ext2",
        placeholder: "Phone number Ext2",
      },
      address: {
        label: "Address",
        placeholder: "Address",
      },
      avatar: {
        label: "Avatar",
        placeholder: "Avatar",
      },
      tncAcceptance: {
        label: "Tnc Acceptance",
        placeholder: "Tnc Acceptance",
      },
    }),

    doctorForm: asFormFields({
      education: {
        label: "Education",
        placeholder: "Education",
      },
      note: {
        label: "Note",
        placeholder: "Input description here",
      },
      partner: {
        label: "Partner code",
        placeholder: "Partner code",
        errors: {
          required: "Partner code can not empty.",
        },
      },
      specialties: {
        label: "Specialty Type code",
        placeholder: "Specialty Type code",
        errors: {
          required: "Specialty Type can not empty.",
        },
      },
    }),

    clinicForm: asFormFields({
      name: {
        label: "Clinic partner name",
        placeholder: "Enter name",
        errors: {
          required: "Name can not empty.",
        },
      },
      phoneNumber: {
        label: "Phone Number of clinic partner",
        placeholder: "Enter Phone Number",
        errors: {
          required: "Phone can not empty.",
        },
      },
      code: {
        label: "Clinic partner code",
        placeholder: "Enter code",
        errors: {
          required: "Code can not empty.",
        },
      },
      address: {
        label: "Address of clinic partner",
        placeholder: "Enter address",
        errors: {
          required: "Address can not empty.",
        },
      },
      email: {
        label: "Email clinic partner",
        placeholder: "Enter email",
        errors: {
          required: "Email can not empty.",
          pattern: "Email is invalid.",
        },
      },
      phoneNumberExt1: {
        label: "Phone Number Ext 1",
        placeholder: "Enter Phone Number",
        errors: {
          pattern: "Phone Number Ext 1 is invalid.",
        },
      },
      phoneNumberExt2: {
        label: "Phone Number Ext 2",
        placeholder: "Phone Number Ext 2 is invalid.",
        errors: {
          pattern: "Phone Number Ext 2 is invalid.",
        },
      },
      description: {
        label: "Description clinic partner",
        placeholder: "Enter description",
      },
      businessNo: {
        label: "BusinessNo clinic partner",
        placeholder: "Enter businessNo",
        errors: {
          required: "BusinessNo clinic partner can not empty.",
        },
      },
    }),
  };

  pages = {
    login: {
      forgot: "Forgot password",
    },
    consultationSchedule:{
      title: "Consultantion Schedule Partiens"
    },
    error404: {
      goToHome: "Go to home",
    },
  };
}
