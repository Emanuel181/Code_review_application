import prisma from './prisma';

export async function syncUser(workosUser) {
    const userData = {
        id: workosUser.id,
        email: workosUser.email,
        firstName: workosUser.firstName || workosUser.first_name || null,
        lastName: workosUser.lastName || workosUser.last_name || null,
    };

    try {
        await prisma.user.upsert({
            where: { email: userData.email },
            update: {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
            },
            create: userData,
        });
        console.log('✅ User synced successfully:', userData.email);
    } catch (error) {
        console.error('❌ Failed to sync user to database');
        console.error('Error details:', error.message);
        console.error('Error code:', error.code);
        console.error('User data attempted:', JSON.stringify(userData, null, 2));

        // Log environment check (without exposing sensitive data)
        console.error('Database URL configured:', !!process.env.DATABASE_URL);
        console.error('Direct URL configured:', !!process.env.DIRECT_URL);

        throw error; // Re-throw to see the error in logs
    }
}