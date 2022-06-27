import Roles from "./Roles";

export default interface Principal {
    username: string;
    roles: Roles[];
}