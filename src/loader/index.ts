import { Application } from "express";
import expressLoader from "./express-loader";

export default function AppLoader({ app }: { app: Application }) {
    expressLoader({ app });
}
