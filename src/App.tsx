import { FormProvider, useForm } from 'react-hook-form';
import './App.css';
import InputLimited from './components/inputLimit/inputLimited';

function App() {
  const methods = useForm();
  const { register } = methods;
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputLimited maxLength={10} value='' name='firtName'>
          <input type="text"  {...register('firtName')} />
        </InputLimited>
        <button type="submit">Submit</button>
      </form>
    </FormProvider>

  )
}

export default App
