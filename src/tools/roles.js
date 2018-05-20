export const roles = {
    0: {
        name: "User",
        // edit own login and password
        permissions: ["edit:self:login", "edit:self:password", "view:self"]
    },
    1: {
        name: "Cook",
        // edit own login and password and see all users
        permissions: ["edit:self:login", "edit:self:password", "view:all"]
    },
    2: {
        name: "Waiter",
        // edit own login and password and see all users
        permissions: ["edit:self:login", "edit:self:password", "view:all"]
    },
    3: {
        name: "Admin",
        // everything
        permissions: ["edit:all", "view:all"]
    }
}

export function roleIntToString(role) {
    switch(role) {
        case 0:
            return "User"
        case 1:
            return "Cook"
        case 2:
            return "Waiter"
        case 3:
            return "Admin"
        default:
            return ""
    }
}