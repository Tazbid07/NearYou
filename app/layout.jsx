import "./globals.css";

export const metadata = {
    title: "NearYou",
    description: "Private chat app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-neutral-950 text-white">
                {children}
            </body>
        </html>
    );
}
