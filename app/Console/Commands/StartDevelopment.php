<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class StartDevelopment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dev:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initialise the application with some dummy data';

    /**
     * @var \App\User
     */
    protected User $user;

    /**
     * Create a new command instance.
     *
     * @param  \App\User  $user
     */
    public function __construct(User $user)
    {
        parent::__construct();

        $this->user = $user;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->call('migrate:fresh');

        $this->user->newInstance([
            'email'    => 'test@example.com',
            'name'     => 'Testeroni',
            'password' => Hash::make('password'),
        ])->save();

        $this->call('db:seed');
    }
}
