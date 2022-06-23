export interface INewItemInput {
    id: number,
    htmlId: string;
    label: string;
    type: string;
    placeholder?: string;
}

export interface INewFormInput {
    title: string,
    data: INewItemInput[]
}

export const userInputs = {
    title: 'Add New User',
    data: [
        {
            id: 1,
            htmlId: 'name',
            label: "Name and Surname",
            type: "text",
            placeholder: "John Doe",
        },
        {
            id: 2,
            htmlId: 'address',
            label: "Address",
            type: "text",
            placeholder: "Elton St. 216 NewYork",
        },
        {
            id: 3,
            htmlId: 'country',
            label: "Country",
            type: "text",
            placeholder: "USA",
        },
        {
            id: 4,
            htmlId: 'phone',
            label: "Phone",
            type: "tel",
            placeholder: "+1 234 567 89",
        },
        {
            id: 5,
            htmlId: 'email',
            label: "Email",
            type: "email",
            placeholder: "john-doe@pm.me",
        },
        {
            id: 6,
            htmlId: 'login',
            label: "Login",
            type: "text",
            placeholder: "john_doe",
        },
        {
            id: 7,
            htmlId: 'password',
            label: "Password",
            type: "password",
        },
    ]
}

export const productInputs = {
    title: 'Add New Product',
    data: [
        {
            id: 1,
            htmlId: 'title',
            label: "Title",
            type: "text",
            placeholder: "Apple Macbook Pro",
        },
        {
            id: 2,
            htmlId: 'description',
            label: "Description",
            type: "text",
            placeholder: "Description",
        },
        {
            id: 3,
            htmlId: 'category',
            label: "Category",
            type: "text",
            placeholder: "Computers",
        },
        {
            id: 4,
            htmlId: 'price',
            label: "Price",
            type: "text",
            placeholder: "100",
        },
        {
            id: 5,
            htmlId: 'stock',
            label: "Stock",
            type: "text",
            placeholder: "in stock",
        },
    ]
}