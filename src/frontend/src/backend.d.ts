import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ClassBooking {
    userName: string;
    userEmail: string;
    date: string;
    time: string;
    className: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface FreeTrialSignup {
    goal: string;
    name: string;
    email: string;
    phone: string;
}
export interface backendInterface {
    bookClass(className: string, date: string, time: string, userName: string, userEmail: string): Promise<void>;
    freeTrial(name: string, email: string, phone: string, goal: string): Promise<void>;
    getAllClassBookings(): Promise<Array<ClassBooking>>;
    getAllContacts(): Promise<Array<ContactSubmission>>;
    getAllFreeTrials(): Promise<Array<FreeTrialSignup>>;
    getAllNewsletterSignups(): Promise<Array<string>>;
    signupNewsletter(email: string): Promise<void>;
    submitContact(name: string, email: string, phone: string, message: string): Promise<void>;
}
