import {Button} from "@/components/ui/button";
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex h-screen max-h-screen">
            {/*Otp Verification */}
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Image
                        src="/assets/images/AlynosCare.png"
                        height={250}
                        width={250}
                        alt="patient"
                        className="mb-12 h-30 w-fit"
                    />

                    <PatientForm />

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 Alynos Care
                        </p>
                        <Link href="/?admin=true" className="text-green-500">
                            Admin
                        </Link>
                    </div>
                </div>
            </section>

            <Image
            src="/assets/images/doctors.jpeg" height={1000} width={1000} alt="patient" className="side-img max-w-[50%]"
            />
        </div>
    )
}
