const initialState = {
    products: {
        list: []
    },
    marushes: {
        list: [],
        address1: "",
        address2: "",
        approval: 0,
        icons: [],
        images: [],
        marushe_id: "",
        marusheName: "",
        prefectures: "",
        telNo: "",
        zipcode: "",
    },
    users: {
        approval: 0,
        isSignedIn: false,
        role: "",
        uid: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        lastname: "",
        lastnameKana: "",
        firstname: "",
        firstnameKana: "",
        icons: [],
        marusheId: "",
        yearOfBirth: "",
        monthOfBirth: "",
        dayOfBirth: "",

    }
};

export default initialState;