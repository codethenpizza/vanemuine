### Generate migration  
`prisma migrate dev --name "migration_name"`

### Migration rollback 
`prisma migrate resolve --rolled-back "migration_name"`

### Run migrations in production
`npx prisma migrate deploy`
