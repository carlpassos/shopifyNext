import { createContext, ReactNode, useState } from "react";


interface CheckoutProviderProps {
  children: ReactNode
}

type cepObject = {
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  ibge: string
}

type sectionState = boolean
type sectionsNumber = 1 | 2 | 3

interface CheckoutContextData {
  sectionOneStatus: sectionState;
  sectionTwoStatus: sectionState;
  sectionThreeStatus: sectionState;
  isSectionOneEditable: boolean;
  isSectionTwoEditable: boolean;
  isSectionThreeEditable: boolean;
  isSectionOneChecked: boolean;
  isSectionTwoChecked: boolean;
  isSectionThreeChecked: boolean;
  sectionOneValidation: () => void;
  sectionTwoValidation: () => void;
  handleSectionEditable: (section: number, isEditable: boolean) => void;
  changeSectionChecked: (section: sectionsNumber, status: boolean) => void;
  handleSection: (section: sectionsNumber) => void;
  validateCheckout: (value: string, boolean: boolean) => void;
  setCepArray: (object: any) => void;
  setCepName: (object: string) => void;
  cepArray: null | cepObject;
  cepName: string;
  isPersonalNameValid: boolean;
  isPersonalEmailValid: boolean;
  isPersonalPhoneValid: boolean;
  isPersonalCpfValid: boolean;
  isPersonalSended: boolean;

  // changeCheckoutPriceLoad: (status: boolean) => void;
}



export const CheckoutContext = createContext({} as CheckoutContextData)

export function CheckoutProvider({ children, ...rest }: CheckoutProviderProps) {

  const [sectionOneStatus, setSectionOneStatus] = useState<sectionState>(true)
  const [sectionTwoStatus, setSectionTwoStatus] = useState<sectionState>(false)
  const [sectionThreeStatus, setSectionThreeStatus] = useState<sectionState>(false)
  const [isSectionOneChecked, setIsSectionOneChecked] = useState<sectionState>(true)
  const [isSectionTwoChecked, setIsSectionTwoChecked] = useState<sectionState>(false)
  const [isSectionThreeChecked, setIsSectionThreeChecked] = useState<sectionState>(false)
  const [isSectionOneEditable, setIsSectionOneEditable] = useState<boolean>(true)
  const [isSectionTwoEditable, setIsSectionTwoEditable] = useState<boolean>(false)
  const [isSectionThreeEditable, setIsSectionThreeEditable] = useState<boolean>(false)


  const [isPersonalNameValid, setIsPersonalNameValid] = useState<boolean>(false)
  const [isPersonalEmailValid, setIsPersonalEmailValid] = useState<boolean>(false)
  const [isPersonalPhoneValid, setIsPersonalPhoneValid] = useState<boolean>(false)
  const [isPersonalCpfValid, setIsPersonalCpfValid] = useState<boolean>(false)
  const [isPersonalSended, setIsPersonalFormSended] = useState<boolean>(false)
  
  
  const [cepName, setCepName] = useState<string>("")
  const [cepArray, setCepArray] = useState<null | cepObject>(null)


  const validateCheckout = (value: string, boolean: boolean) => {
    if (value === 'name') {
      setIsPersonalNameValid(boolean)
      return
    }
    if (value === 'email') {
      setIsPersonalEmailValid(boolean)
      return
    }
    if (value === 'phone') {
      setIsPersonalPhoneValid(boolean)
      return
    }
    if (value === 'cpf') {
      setIsPersonalCpfValid(boolean)
      return
    }
    if (value === 'personal') {
      setIsPersonalFormSended(boolean)
      return
    }
  }

  const sectionOneValidation = () => {
    setSectionOneStatus(false); setSectionTwoStatus(true); setSectionThreeStatus(false)
    setIsSectionTwoEditable(true);
  }

  const sectionTwoValidation = () => {
    setSectionOneStatus(false); setSectionTwoStatus(false); setSectionThreeStatus(true)
    setIsSectionTwoChecked(true)
    setIsSectionThreeEditable(true);
  }

  const handleSection = (section: sectionsNumber) => {
    if (section === 1) {
      setSectionOneStatus(true); setSectionTwoStatus(false); setSectionThreeStatus(false)
    }

    if (section === 2) {
      setSectionOneStatus(false); setSectionTwoStatus(true); setSectionThreeStatus(false)
    }

    if (section === 3) {
      setSectionOneStatus(false); setSectionTwoStatus(false); setSectionThreeStatus(true)
    }
  }

  const handleSectionEditable = (section: sectionsNumber, isEditable: boolean) => {
    if (section === 1) {
      setIsSectionOneEditable(isEditable)
    }

    if (section === 2) {
      setIsSectionTwoEditable(isEditable)
    }

    if (section === 3) {
      setIsSectionThreeEditable(isEditable)
    }
  }

  const switchSection = (section: sectionsNumber) => {
    if (section === 1) {
      setSectionOneStatus(true); setSectionOneStatus(false); setSectionOneStatus(false)
    }
  }

  const changeSectionStatus = (section: sectionsNumber, status: boolean) => {
    if (section === 1) {
      setSectionOneStatus(status)
    }
    if (section === 2) {
      setSectionTwoStatus(status)
    }
    if (section === 3) {
      setSectionThreeStatus(status)
    }
  }

  const changeSectionChecked = (section: sectionsNumber, status: boolean) => {
    if (section === 1) {
      setIsSectionOneChecked(status)
    }
    if (section === 2) {
      setIsSectionTwoChecked(status)
    }
    if (section === 3) {
      setIsSectionThreeChecked(status)
    }
  }

  return (
    <CheckoutContext.Provider value={{
      sectionOneStatus,
      sectionTwoStatus,
      sectionThreeStatus,
      isSectionOneEditable,
      isSectionTwoEditable,
      isSectionThreeEditable,
      isSectionOneChecked,
      isSectionTwoChecked,
      isSectionThreeChecked,
      setCepArray,
      sectionOneValidation,
      sectionTwoValidation,
      handleSectionEditable,
      handleSection,
      changeSectionChecked,
      validateCheckout,
      setCepName,
      cepArray,
      cepName,
      isPersonalNameValid,
      isPersonalEmailValid,
      isPersonalPhoneValid,
      isPersonalCpfValid,
      isPersonalSended,
    }}>
      {children}
    </CheckoutContext.Provider>
  )  
}