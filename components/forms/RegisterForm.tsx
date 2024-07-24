"use client"
import Image from 'next/image'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {PatientFormValidation, UserFormValidation} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {createUser} from "@/lib/actions/patient.actions";
import {FormFieldType} from "@/components/forms/PatientForm";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues} from "@/constants";
import {Label} from "@/components/ui/label";
import {SelectItem} from "@/components/ui/select";
import FileUploader from "@/components/FileUploader";


const RegisterForm = ({user}: {user: User}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
        ...PatientFormDefaultValues,
        name: "",
        email:"",
        phone:"",
    },
  })


  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {

        setIsLoading(true);

        let formData;

        if(values.identificationDocument && values.identificationDocument.length > 0) {
            const  blobFile = new Blob([values.identificationDocument[0]],
                {
                    type: values.identificationDocument[0].type,
                })

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name)
        }

        try {
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,
            }

            const patient = await registerPatient(patientData);

            if(patient) router.push(`/patients/${user.$id}/new-appointment`)

        }catch (error){
            console.log(error);
        }
  }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
              <section className="space-y-4">
                  <h1 className="header">Welcome 👋</h1>
                  <p className="text-dark-700">Let Us Know more about yourself.</p>
              </section>

               <section className="space-y-6">
                   <div className="mb-9 space-y-1">
                       <h2 className="sub-header">Personal Information.</h2>
                   </div>
              </section>

              <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name = "name"
                  label="Full Name"
                  placeholder="John Doe"
                  iconSrc="/assets/icons/user.svg"
                  iconAlt="user"
              />

              <div className="flex flex-col gap-6 xl:flex-row">

                  <CustomFormField
                  fieldType={FormFieldType.INPUT} control={form.control}
                  name = "email"
                  label="Email"
                  placeholder="yourname@gmail.com"
                  iconSrc="/assets/icons/email.svg"
                  iconAlt="email"
                  />

                  <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT} control={form.control}
                  name = "phone"
                  label="Phone Number"
                  placeholder="(254) 700-001 002"
                  />
              </div>

              <div className=" flex flex-col gap-6 xl:flex-row">
                  <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER} control={form.control}
                  name = "birthDate"
                  label="Date Of Birth"
                  />

                  <CustomFormField
                  fieldType={FormFieldType.SKELETON} control={form.control}
                  name = "gender"
                  label="Gender"
                  renderSkeleton={(field) => (
                      <FormControl>
                       <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                   onValueChange={field.onChange}
                                   defaultValue={field.value}>
                           {GenderOptions.map((option) => (
                             <div className="radio-group" key={option}>
                                 <RadioGroupItem value={option} id={option}/>
                                 <Label htmlFor={option} className="cursor-pointer">
                                     {option}
                                 </Label>
                             </div>
                          ))}

                       </RadioGroup>
                      </FormControl>
                  )}
                  />
              </div>

              <div className=" flex flex-col gap-6 xl:flex-row">

                  <CustomFormField
                  fieldType={FormFieldType.INPUT} control={form.control}
                  name = "address"
                  label="Address"
                  placeholder="14th Street Westlands"
                  />

                  <CustomFormField
                  fieldType={FormFieldType.INPUT} control={form.control}
                  name = "occupation"
                  label="Occupation"
                  placeholder="Software Engineer"
                  />

              </div>

              <div className=" flex flex-col gap-6 xl:flex-row">

                  <CustomFormField
                  fieldType={FormFieldType.INPUT} control={form.control}
                  name = "emergencyContactName"
                  label="Emergency contact name"
                  placeholder="Guardian's name"
                  />

                  <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT} control={form.control}
                  name = "emengencyContactNumber"
                  label="Emergency contact number"
                  placeholder="(254) 700-001 002"
                  />
              </div>

              <section className="space-y-6">
                   <div className="mb-9 space-y-1">
                       <h2 className="sub-header">Medical Information.</h2>
                   </div>
              </section>

              <CustomFormField
                  fieldType={FormFieldType.SELECT} control={form.control}
                  name = "primaryPhysician"
                  label="Primary Physician"
                  placeholder="Select a physician"
              >
                  {Doctors.map((doctor) => (
                      <SelectItem key={doctor.name} value={doctor.name}>
                          <div className="flex cursor-pointer items-center gap-2">
                              <Image src={doctor.image} width={32} height={32} alt={doctor.name} className="rounded-full border border-dark-500"
                              />
                              <p>{doctor.name}</p>
                          </div>
                      </SelectItem>
                  ))}
              </CustomFormField>


              <div className=" flex flex-col gap-6 xl:flex-row">
                  <CustomFormField
                  fieldType={FormFieldType.INPUT} control={form.control}
                  name = "address"
                  label="Address"
                  placeholder="14th Street Westlands"
                  />

                  <CustomFormField
                  fieldType={FormFieldType.INPUT} control={form.control}
                  name = "occupation"
                  label="Occupation"
                  placeholder="Software Engineer"
                  />
              </div>

              <div className=" flex flex-col gap-6 xl:flex-row">
                  <CustomFormField
                  fieldType={FormFieldType.TEXTAREA} control={form.control}
                  name = "allergies"
                  label="Allergies (if any)"
                  placeholder="Peanuts, Pennicilin, Pollen"
                  />

                  <CustomFormField
                  fieldType={FormFieldType.TEXTAREA} control={form.control}
                  name = "currentMedication"
                  label="Current medication (if any)"
                  placeholder="Ibuprofen 200mg, Paracetamol 500mg"
                  />
              </div>

              <div className=" flex flex-col gap-6 xl:flex-row">
                  <CustomFormField
                  fieldType={FormFieldType.TEXTAREA} control={form.control}
                  name = "familyMedicalHistory"
                  label="Family medical history"
                  placeholder="Both father and mother had no diagnosed disease"
                  />

                  <CustomFormField
                  fieldType={FormFieldType.TEXTAREA} control={form.control}
                  name = "pastMedicalHistory"
                  label="Past medical history"
                  placeholder="Appendectomy, Tonsillectomy"
                  />
              </div>

              <section className="space-y-6">
                   <div className="mb-9 space-y-1">
                       <h2 className="sub-header">Identification and verification.</h2>
                   </div>
              </section>

              <CustomFormField
                  fieldType={FormFieldType.SELECT} control={form.control}
                  name = "identificationType"
                  label="Identification type"
                  placeholder="Select identification type"
              >
                  {IdentificationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                          {type}
                      </SelectItem>
                  ))}
              </CustomFormField>

              <CustomFormField
                  fieldType={FormFieldType.INPUT} control={form.control}
                  name = "identifcationNumber"
                  label="Identification number"
                  placeholder="ex: 12345789"
                  />

              <CustomFormField
                  fieldType={FormFieldType.SKELETON} control={form.control}
                  name = "identificationDocument"
                  label="Scanned copy of identification document"
                  renderSkeleton={(field) => (
                      <FormControl>
                          <FileUploader files={field.value}
                                        onChange={field.onChange}
                          />
                      </FormControl>
                  )}
                  />

              <section className="space-y-6">
                   <div className="mb-9 space-y-1">
                       <h2 className="sub-header">Consent and Privacy.</h2>
                   </div>
              </section>

              <CustomFormField control={form.control} fieldType={FormFieldType.CHECKBOX}
                               name="treatmentConsent"
                               label="I consent to treatment"
              />

              <CustomFormField control={form.control} fieldType={FormFieldType.CHECKBOX}
                               name="disclosureConsent"
                               label="I consent to disclosure of information"
              />

              <CustomFormField control={form.control} fieldType={FormFieldType.CHECKBOX}
                               name="privacyConsent"
                               label="I consent to privacy policy"
              />


            <SubmitButton isLoading={isLoading}>
                Get Started
            </SubmitButton>
          </form>
        </Form>
    )
}
export default RegisterForm