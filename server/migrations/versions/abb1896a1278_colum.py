"""colum

Revision ID: abb1896a1278
Revises: c7948b3620cd
Create Date: 2024-07-09 13:51:41.115674

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'abb1896a1278'
down_revision = 'c7948b3620cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservation', schema=None) as batch_op:
        batch_op.add_column(sa.Column('number_guests', sa.Integer(), nullable=False))
        batch_op.drop_column('number_gests')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservation', schema=None) as batch_op:
        batch_op.add_column(sa.Column('number_gests', sa.INTEGER(), nullable=False))
        batch_op.drop_column('number_guests')

    # ### end Alembic commands ###
