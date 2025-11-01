import { withAuth } from "@workos-inc/authkit-nextjs";

/**
 * Fetches user account data including user details, role, and permissions
 * @returns {Promise<{user: Object, role: string, permissions: Array, userFields: Array}>}
 */
export async function fetchAccountData() {
    const { user, role, permissions } = await withAuth({ ensureSignedIn: true });

    const userFields = [
        ["First name", user?.firstName],
        ["Last name", user?.lastName],
        ["Email", user?.email],
        role ? ["Role", role] : [],
        permissions ? ["Permissions", permissions] : [],
        ["Id", user?.id],
    ].filter((arr) => arr.length > 0);

    return {
        user,
        role,
        permissions,
        userFields,
    };
}

