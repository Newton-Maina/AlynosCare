# AlynosCare

![AlynosCare Banner](/public/assets/images/og/og_image.webp)

**AlynosCare** is a modern, comprehensive Patient Management System built to streamline healthcare administrative tasks. It simplifies patient registration, appointment scheduling, and doctor management through a clean and intuitive user interface.

> **Note:** This project is currently a prototype/work-in-progress but pictures a fully functional implementation of a healthcare management platform.

## 🚀 Tech Stack

-   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
-   **Backend / Database:** [Appwrite](https://appwrite.io/)
-   **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
-   **File Storage:** Appwrite Storage

## ✨ Key Features

-   **Patient Onboarding:** Secure and easy-to-use registration forms for new patients.
-   **Appointment Management:** Schedule, cancel, and view pending appointments.
-   **Admin Dashboard:** Centralized view for administrators to manage appointments and doctors.
-   **Doctor Profiles:** Detailed profiles for healthcare professionals.
-   **File Uploads:** Secure handling of medical documents and identification.
-   **Responsive Design:** Fully optimized for desktop and mobile devices.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/alynos-care.git
    cd alynos-care
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**

    Create a `.env.local` file in the root directory and add the following keys based on your Appwrite configuration:

    ```env
    PROJECT_ID=your_appwrite_project_id
    API_KEY=your_appwrite_api_key
    DATABASE_ID=your_database_id
    PATIENT_COLLECTION_ID=your_patient_collection_id
    APPOINTMENT_COLLECTION_ID=your_appointment_collection_id
    DOCTOR_COLLECTION_ID=your_doctor_collection_id
    NEXT_PUBLIC_BUCKET_ID=your_storage_bucket_id
    NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1 # or your self-hosted endpoint
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
AlynosCare/
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable UI components and forms
│   ├── forms/          # Complex form components (Patient, Register)
│   └── ui/             # Shadcn UI primitives
├── lib/                # Utility functions, validation schemas, and Appwrite config
├── public/             # Static assets (images, icons)
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).