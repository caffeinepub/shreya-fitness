import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Iter "mo:core/Iter";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  type FreeTrialSignup = {
    name : Text;
    email : Text;
    phone : Text;
    goal : Text;
  };

  type ClassBooking = {
    className : Text;
    date : Text;
    time : Text;
    userName : Text;
    userEmail : Text;
  };

  let contacts = List.empty<ContactSubmission>();
  let newsletter = List.empty<Text>();
  let freeTrials = List.empty<FreeTrialSignup>();
  let classBookings = List.empty<ClassBooking>();

  public shared ({ caller }) func submitContact(name : Text, email : Text, phone : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      message;
    };
    contacts.add(submission);
  };

  public shared ({ caller }) func signupNewsletter(email : Text) : async () {
    newsletter.add(email);
  };

  public shared ({ caller }) func freeTrial(name : Text, email : Text, phone : Text, goal : Text) : async () {
    let signup : FreeTrialSignup = {
      name;
      email;
      phone;
      goal;
    };
    freeTrials.add(signup);
  };

  public shared ({ caller }) func bookClass(className : Text, date : Text, time : Text, userName : Text, userEmail : Text) : async () {
    let booking : ClassBooking = {
      className;
      date;
      time;
      userName;
      userEmail;
    };
    classBookings.add(booking);
  };

  public query ({ caller }) func getAllContacts() : async [ContactSubmission] {
    contacts.toArray();
  };

  public query ({ caller }) func getAllNewsletterSignups() : async [Text] {
    newsletter.toArray();
  };

  public query ({ caller }) func getAllFreeTrials() : async [FreeTrialSignup] {
    freeTrials.toArray();
  };

  public query ({ caller }) func getAllClassBookings() : async [ClassBooking] {
    classBookings.toArray();
  };
};
