import { LoadingButton } from "@mui/lab";
import { Button, Grid, Snackbar, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import * as yup from "yup";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useServiceProvider } from "../../services/ServiceProvider";

export interface EditProfileFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  university: string;
  graduationYear: string;
  password?: string;
  subscriptionPlanId?: number;
  displayName?: string;
  city?: string;
}

interface UserProfileFormProps {
  adminView?: boolean;
  newUser?: boolean;
  onClose?: () => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email"),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
      "Passwords must contain at least one upper case letter, one lower case letter, one digit, and one special character (e.g. @, !, ?)."
    ),
  graduationYear: yup
    .string()
    .matches(/^\d{4}$/, "Graduation must be a valid year")
});

function UserProfileForm({ adminView, newUser, onClose }: UserProfileFormProps) {
  const { showSnackbar, snackbarProps } = useSnackbar();
  const { accountStore, userStore } = useServiceProvider();
  const [loading, setLoading] = useState(false);

  const profileToEdit = userStore.userInView || accountStore.myProfile;

  const getIniitalProfile = () => {
    if (newUser) {
      return {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        university: "",
        graduationYear: "",
        password: "",
        subscriptionPlanId: 1,
        displayName: "",
        city: "",
      };
    } else {
      return {
        id: profileToEdit?.id || "",
        firstName: profileToEdit?.firstName || "",
        lastName: profileToEdit?.lastName || "",
        email: profileToEdit?.email || "",
        phoneNumber: profileToEdit?.phoneNumber || "",
        university: profileToEdit?.university || "",
        graduationYear: profileToEdit?.graduationYear?.toString() || "",
        password: "",
        subscriptionPlanId: 1,
        displayName: "",
        city: "",
      };
    }
  }

  const formik = useFormik({
    initialValues: getIniitalProfile(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (newUser) {
        handleAddUser(values);
      } else {
        handleUpdateUser(values);
      }
    },
  });

  async function handleUpdateUser(values: EditProfileFormData) {
    try {
      setLoading(true);
      delete values.subscriptionPlanId;
      if (adminView) {
        delete values.password;
        delete values.email;
      } else {
        delete values.id;
      }

      const success = adminView ?
        await userStore.updateUser(values) :
        await userStore.editAccount(values);
      if (success) {
        if (userStore.userInView) userStore.getUserList();
        if (!adminView) accountStore.getMyProfile();
        if (onClose) onClose();
      }
    } catch (error) {
      showSnackbar("Error updating profile", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser(values: EditProfileFormData) {
    try {
      setLoading(true);

      delete values.id;

      const success = await userStore.addUser({
        ...values,
        subscriptionPlanId: values.subscriptionPlanId?.toString(),
        subscribeToPromotions: true,
      });
      if (success) {
        showSnackbar("User added", "success");
      }
    } catch (error) {
      showSnackbar("Error adding user", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Snackbar {...snackbarProps} />
      <Grid container spacing={2.5} py={1}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            required
          />
        </Grid>
        {newUser && (
          <>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Email ID"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                required
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Mobile Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="University"
            name="university"
            value={formik.values.university}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.university && Boolean(formik.errors.university)}
            helperText={formik.touched.university && formik.errors.university}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Graduation Year"
            name="graduationYear"
            value={formik.values.graduationYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            error={formik.touched.graduationYear && Boolean(formik.errors.graduationYear)}
            helperText={formik.touched.graduationYear && formik.errors.graduationYear}
            required
          />
        </Grid>
        {/* {newUser && (
          <Grid item xs={12} md={4}>
            <FormControl size="small" fullWidth>
              <InputLabel>Plan</InputLabel>
              <Select
                value={formik.values.subscriptionPlanId}
                name="subscriptionPlanId"
                label="Plan"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subscriptionPlanId && Boolean(formik.errors.subscriptionPlanId)}
              >
                {plans.map(plan => (
                  <MenuItem value={plan.id} key={plan.id}>{plan.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )} */}
      </Grid>
      <Stack spacing={1} alignItems="center" justifyContent="right" direction="row" mt={8}>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton variant="contained" type="submit" loading={loading}>{newUser ? "Add User" : "Save"}</LoadingButton>
      </Stack>
    </form>
  );
}

export default observer(UserProfileForm);