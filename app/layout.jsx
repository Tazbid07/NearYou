import "./globals.css";

export const metadata = {
    title: "NearYou",
    description: "A private chat app for people near you",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white min-h-screen">
                {children}
            </body>
        </html>
    );
}
