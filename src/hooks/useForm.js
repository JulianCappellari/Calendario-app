import { useState } from "react"


const useForm = (estadoInicial = {}) => {
const [formValue, setFromValue] = useState(estadoInicial)
  const reset = (nuevoFormulario = estadoInicial) => {
    setFromValue( nuevoFormulario) //Reinicio el campo de llenado
  }
  const handleInputChange = ({ target }) => {
    setFromValue({
      ...formValue,
      [target.name]: target.value,
    });
  };
  return [formValue, handleInputChange, reset]
}
export default useForm