export const loginselector = {
  email: '[name="email"]',
  password: '[name="password"]',
  login: "//button[@type='submit']",
};
export const forgetpassword = {
  forgetpassword: "//a[normalize-space()='Forgot Password?']",
  email: '[name="email"]',
  next: "//button[@type='submit']",
};

export const dashboardselector = {
  profileicon:
    "#radix-_r_45_ > aside > div.py-1.border.rounded-xl.border-neutral-200.overflow-hidden.hover\:bg-neutral-100.cursor-pointer.transition-\[background\].shrink-0 > div",
  logout: "//button[normalize-space()='Logout']",
  logoutclick: '//*[@id="radix-_r_53_"]/div[2]/button[2]',
  sidebarmenu:
    "/html[1]/body[1]/div[1]/div[1]/div[1]/aside[1]/div[1]/div[2]/button[2]/span[1]/*[name()='svg'][1]",
  branchmenu:
    "/html[1]/body[1]/div[1]/div[1]/div[1]/aside[1]/div[2]/div[1]/nav[1]/div[1]/a[1]/span[1]/*[name()='svg'][1] ",
  addBranch:
    "//div[contains(@class,'lg:flex gap-2')]//button[normalize-space()='Add Branch']",
};

export const search = {
  searchclick: "//input[@placeholder='Search...']",
};
export const branchselector = {
  addbranch: '//*[@id="root"]/div/div[2]/main/div/div[1]/div[1]/div[2]/button',
  Branchname: "#name",
  Slug: "#slug",

  BranchPhone: '[name="phone"]',
  BranchEmail: "#email",
  Status:
    "/html/body/div[1]/div/div[2]/main/div/div[2]/div/form/div/div/div/div[5]/button",
  Address: "#address",
  TimeZone: "//span[@class='flex-1 truncate text-neutral-700']",

  Firstname: "#admin_first_name",
  Lastname: "#admin_last_name",
  AdminEmail: "#admin_email ",
  Password: '[name="admin_password"]',
  AdminPhone: "[name='phone'] ",

  createbranch: "//button[normalize-space()='Save Changes']",

  editbranch:
    "//tbody/tr[2]//*[name()='svg']//*[name()='path' and contains(@d,'M12 3H5a2 ')]",
  updatebranch: "//button[normalize-space()='Save Changes']",
  deletebranch: "//*[name()='path' and contains(@d,'M10 11v6')]",
  confirmdelete: "//input[@placeholder='Type Delete Branch here']",
  delete: "/html[1]/body[1]/div[3]/div[4]/button[2]",
};

export const customer = {
  management: "//button[.//span[normalize-space()='Management']]",
  customerpage: "//a[normalize-space()='Customers']",
  addcustomer: "//button[normalize-space()='Add Customer']",
  firstname: "#first_name",
  lastname: "#last_name",
  phone: '[name="phone"]',
  email: "#email",
  dob: "#date_of_birth",
  monthdropdown: '//button[@aria-label="Choose the Nepali month"]',
  yeardropdown: 'button[aria-label="Choose the Nepali year"]',
  address: "#address",
  note: "#note",
  genderdropdown: "#radix-_r_2v_",
  gender: "/html[1]/body[1]/div[7]/div[1]/div[1]/div[1]/div[3]",

  createcustomer: "//button[normalize-space()='Save Changes']",
};

export const service = {
  catalog: "//button[.//span[normalize-space()='Catalog']]",
  servicepage: "//a[normalize-space()='Services']",

  addservice:
    "/html[1]/body[1]/div[1]/div[1]/div[2]/main[1]/div[1]/div[1]/div[1]/div[2]/button[1]",
  servicename: "#name",
  search: "//input[@placeholder='Search...']",
  categorydropdown: 'button[role="combobox"]',
  price: "#price",
  duration: "#duration",
  commissiontypedropdown: 'button[role="combobox"]',

  value:
    "/html[1]/body[1]/div[1]/div[1]/div[2]/main[1]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]",
  description: "#description",
  createservice:
    "/html[1]/body[1]/div[1]/div[1]/div[2]/main[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/button[1]",
};

export const staff = {
  management: "//button[.//span[normalize-space()='Management']]",
  staffpage: "//a[normalize-space()='Staff']",
  addstaff: "//button[normalize-space()='Add Staff']",
  firstname: "#first_name",
  lastname: "#last_name",
  phone: "[name='phone']",
  email: "#email",
  probadge: "#pro_badges",
  staffrole: "//button[.//span[normalize-space()='e.g. Bridal Makeup Artist']]",
  specializationSearch: 'input[placeholder="Search"]',
  specializationOption:
    "//button[@role='checkbox'][.//span[normalize-space()='Hair Cutting']]",
  roleDropdown: "//button[.//span[normalize-space()='e.g. Role 1']]",
  joineddate: "#joined_date",
  createstaff:
    '//*[@id="root"]/div/div[2]/main/div/div/div[1]/div[2]/div/div/button[1]',
};

export const waiting = {
  waiting: "//a[.//span[normalize-space()='Waiting']]",
  addWaiting: "//button[normalize-space()='Add Waiting']",
  searchCustomer: 'input[placeholder="Enter name or phone number"]',
  nextButton: "//button[@type='submit' and normalize-space()='Next']",
  addToWaiting:
    "//button[@type='button' and normalize-space()='Add to waiting']",
  addService:
    "/html[1]/body[1]/div[1]/div[1]/div[2]/main[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[1]/div[3]/button[1]",
  serviceSearch: "//input[@placeholder='Search...']",
  searchdone: "//button[normalize-space()='Done']",
  assignstaff:"/html[1]/body[1]/div[1]/div[1]/div[2]/main[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/button[1]",
  selectstaff:"//span[contains(text(),'puja silwal')]",
  typestaff:"//input[@placeholder='Search...']",


  sessionstart:"/html[1]/body[1]/div[1]/div[1]/div[2]/main[1]/div[1]/div[2]/div[1]/div[1]/div[2]/button[1]",
  completesession:"//div//div//div//div//div//div//div[1]//div[2]//div[2]//button[2]",
  submit:"//button[@type='submit']",
};
